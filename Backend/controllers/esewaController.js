// // controllers/esewaController.js
// const Payment =require("../models/Payment.js") ;
// const ExamForm =require("../models/ExamForm.js");
// const{ getEsewaPaymentHash, verifyEsewaPayment }=require( "../utils/esewa.js");

//  const initiateEsewaPayment = async (req, res) => {
//   const { formId, amount } = req.body;

//   const form = await ExamForm.findById(formId);
//   if (!form) return res.status(404).json({ error: "Form not found" });

//   const payment = await Payment.create({
//     transaction_uuid: crypto.randomUUID(),
//     productId: formId,
//     amount,
//     paymentGateway: "esewa",
//   });

//   const paymentData = getEsewaPaymentHash({
//     amount,
//     transaction_uuid: payment.transaction_uuid,
//   });

//   res.json({ paymentData });
// };

// const esewaSuccess = async (req, res) => {
//   try {
//     const decoded = await verifyEsewaPayment(req.query.data);

//     const payment = await Payment.findOne({ transaction_uuid: decoded.transaction_uuid });
//     if (!payment) throw new Error("Payment not found");

//     payment.status = "success";
//     payment.verificationPayload = decoded;
//     await payment.save();

//     await ExamForm.findByIdAndUpdate(payment.productId, {
//       paymentStatus: "completed",
//     });

//     res.redirect("http://localhost:5173/payment-success");
//   } catch (err) {
//     res.redirect("http://localhost:5173/payment-failed");
//   }
// };
// module.exports={initiateEsewaPayment,esewaSuccess}



// controllers/esewaController.js
const crypto = require("crypto");
const Payment = require("../models/Payment.js");
const ExamForm = require("../models/ExamForm.js");
// const { getEsewaPaymentHash, verifyEsewaPayment } = require("../utils/esewa.js");
const { getEsewaPaymentPayload , verifyEsewaPayment } = require("../utils/esewa.js");


const initiateEsewaPayment = async (req, res) => {
  try {
    const { formId ,amount} = req.body;

    if (!formId||!amount) {
      return res.status(400).json({ error: "formId is required" });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized - Please login" });
    }

    const form = await ExamForm.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    if (form.studentId.toString() !== req.user.id) {
      return res.status(403).json({ error: "This form doesn't belong to you" });
    }

    if (form.paymentStatus === "completed") {
      return res.status(400).json({ error: "Payment already completed" });
    }

    // ✅ BACKEND decides amount
    // const amount = form.examFee || 200; // example

    const transaction_uuid = crypto.randomUUID();

   await Payment.create({
          transaction_uuid,
      productId: formId,
      amount,
      paymentGateway: "esewa",
      status: "pending",
    });

    // ✅ eSewa mapping happens HERE (BACKEND)
    const paymentData = getEsewaPaymentPayload({
      amount: amount.toString(),
      transaction_uuid,
    });
// console.log("transaction",payment.transaction_uuid);

    return res.json({ paymentData });

  } catch (err) {
    console.error("eSewa initiation error:", err);
    res.status(500).json({
      error: "Failed to initiate payment",
      message: err.message,
    });
  }
};


const esewaSuccess = async (req, res) => {
  try {
    console.log("eSewa success callback hit");
    console.log("Query params:", req.query);

    if (!req.query.data) {
      console.error("No data parameter in eSewa callback");
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?reason=no_data`);
    }

    // Verify the payment with eSewa
    const decoded = await verifyEsewaPayment(req.query.data);
    console.log("Payment verified:", decoded);

    // Find the payment record
    const payment = await Payment.findOne({ transaction_uuid: decoded.transaction_uuid });
    if (!payment) {
      console.error("Payment not found:", decoded.transaction_uuid);
      return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?reason=payment_not_found`);
    }

    // Update payment status
    payment.status = "success";
    payment.verificationPayload = decoded;
    await payment.save();

    console.log("Payment status updated to success");

    // Update exam form payment status
    const form = await ExamForm.findByIdAndUpdate(
      payment.productId,
      { paymentStatus: "completed" },
      { new: true }
    );

    console.log("Form payment status updated:", form._id);

    // Redirect to success page with form ID
    res.redirect(`${process.env.FRONTEND_URL}/payment-success?formId=${payment.productId}`);

  } catch (err) {
    console.error("eSewa success callback error:", err);
    res.redirect(`${process.env.FRONTEND_URL}/payment-failed?reason=verification_failed`);
  }
};

const esewaFailure = async (req, res) => {
  console.log("eSewa failure callback hit");
  console.log("Query params:", req.query);

  // You might want to update payment status to failed here
  // if you have the transaction_uuid in the query params

  res.redirect(`${process.env.FRONTEND_URL}/payment-failed?reason=user_cancelled`);
};

module.exports = {
  initiateEsewaPayment,
  esewaSuccess,
  esewaFailure
};