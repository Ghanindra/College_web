

// const crypto = require("crypto");
// const Payment = require("../models/Payment");
// const ExamForm = require("../models/ExamForm");
// const { getEsewaPaymentPayload } = require("../utils/esewa");

// const initiateEsewaPayment = async (req, res) => {
//   try {
//     const { formId, amount } = req.body;

//     if (!req.user?.id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const form = await ExamForm.findById(formId);

//     if (!form) {
//       return res.status(404).json({ error: "Form not found" });
//     }

//     if (form.studentId.toString() !== req.user.id) {
//       return res.status(403).json({ error: "Not your form" });
//     }

//     if (form.paymentStatus === "completed") {
//       return res.status(400).json({ error: "Already paid" });
//     }

//     // 🔐 Generate ONCE
//     const transaction_uuid = crypto.randomUUID();
// console.log("generated transaction code",transaction_uuid);

//     await Payment.create({
//       transaction_uuid,
//       productId: formId,
//       amount,
//       paymentGateway: "esewa",
//       status: "pending",
//     });

//     const paymentData = getEsewaPaymentPayload({
//       amount,
    
      
//       transaction_uuid,
//     });

//     res.json({ paymentData });

//   } catch (err) {
//     console.error("❌ eSewa init error:", err);
//     res.status(500).json({ error: err.message });
//   }
// };




// const esewaSuccess = async (req, res) => {
//   try {
//     console.log("🟢 eSewa success callback hit");
//     console.log("Query params:", req.query);

//     if (!req.query.data) {
//       console.error("❌ No data parameter in eSewa callback");
//       return res.redirect(`${process.env.FRONTEND_URL}/payment-failed?reason=no_data`);
//     }

//     // Verify the payment with eSewa
//     console.log("🔹 Verifying payment with eSewa...");
//     const decoded = await verifyEsewaPayment(req.query.data);
//     console.log("🟢 Payment verified:", decoded);

//     // Find the payment record
//     const payment = await Payment.findOne({ 
//       transaction_uuid: decoded.transaction_uuid 
//     });

//     if (!payment) {
//       console.error("❌ Payment not found:", decoded.transaction_uuid);
//       return res.redirect(
//         `${process.env.FRONTEND_URL}/payment-failed?reason=payment_not_found`
//       );
//     }

//     console.log("🟢 Payment record found:", payment._id);

//     // Update payment status
//     payment.status = "success";
//     payment.verificationPayload = decoded;
//     await payment.save();

//     console.log("🟢 Payment status updated to success");

//     // Update exam form payment status
//     const form = await ExamForm.findByIdAndUpdate(
//       payment.productId,
//       { 
//         paymentStatus: "completed",
//         paymentDetails: {
//           ...form.paymentDetails,
//           transactionId: decoded.transaction_uuid,
//           paidAt: new Date(),
//         }
//       },
//       { new: true }
//     );

//     console.log("🟢 Form payment status updated:", form._id);

//     // Redirect to success page with form ID
//     res.redirect(
//       `${process.env.FRONTEND_URL}/payment-success?formId=${payment.productId}&transactionId=${decoded.transaction_uuid}`
//     );

//   } catch (err) {
//     console.error("❌ eSewa success callback error:", err);
//     console.error("Error details:", err.response?.data || err.message);
//     res.redirect(
//       `${process.env.FRONTEND_URL}/payment-failed?reason=verification_failed`
//     );
//   }
// };

// const esewaFailure = async (req, res) => {
//   console.log("❌ eSewa failure callback hit");
//   console.log("Query params:", req.query);

//   // If you have transaction info in query params, you can update payment status here
//   if (req.query.transaction_uuid) {
//     try {
//       await Payment.findOneAndUpdate(
//         { transaction_uuid: req.query.transaction_uuid },
//         { status: "failed" }
//       );
//       console.log("🔹 Payment status updated to failed");
//     } catch (err) {
//       console.error("Error updating payment status:", err);
//     }
//   }

//   res.redirect(
//     `${process.env.FRONTEND_URL}/payment-failed?reason=user_cancelled`
//   );
// };

// module.exports = {
//   initiateEsewaPayment,
//   esewaSuccess,
//   esewaFailure,
// };


const crypto = require("crypto");
const Payment = require("../models/Payment");
const ExamForm = require("../models/ExamForm");
const {
  getEsewaPaymentPayload,
  verifyEsewaPayment,
} = require("../utils/esewa");

/**
 * INITIATE ESEWA PAYMENT
 */
const initiateEsewaPayment = async (req, res) => {
  try {
    const { formId } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const form = await ExamForm.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    if (form.studentId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Not your form" });
    }

    if (form.paymentStatus === "completed") {
      return res.status(400).json({ error: "Already paid" });
    }

    // 🔒 PREVENT DOUBLE PAYMENT
    const existingPayment = await Payment.findOne({
      productId: formId,
      status: "success",
    });

    if (existingPayment) {
      return res.status(400).json({ error: "Payment already completed" });
    }

    // 🔐 BACKEND-CONTROLLED AMOUNT
    const amount = 200; // or calculate from form.subjects.length

    const transaction_uuid = crypto.randomUUID();
    console.log("🔐 transaction_uuid:", transaction_uuid);

    await Payment.create({
      transaction_uuid,
      productId: formId,
      amount,
      paymentGateway: "esewa",
      status: "pending",
    });

    const paymentData = getEsewaPaymentPayload({
      amount,
      transaction_uuid,
    });

    res.json({ paymentData });
console.log("payload",paymentData);

  } catch (err) {
    console.error("❌ eSewa init error:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * ESEWA SUCCESS CALLBACK
 */
const esewaSuccess = async (req, res) => {
  try {
    if (!req.query.data) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failed?reason=no_data`
      );
    }

    // 1️⃣ Verify with eSewa
    const decoded = await verifyEsewaPayment(req.query.data);

    // 2️⃣ Find payment
    const payment = await Payment.findOne({
      transaction_uuid: decoded.transaction_uuid,
    });

    if (!payment) {
      return res.redirect(
        `${process.env.FRONTEND_URL}/payment-failed?reason=payment_not_found`
      );
    }

    // 3️⃣ Amount check (SECURITY)
    // if (String(payment.amount) !== String(decoded.total_amount)) {
    //   payment.status = "failed";
    //   await payment.save();

    //   return res.redirect(
    //     `${process.env.FRONTEND_URL}/payment-failed?reason=amount_mismatch`
    //   );
    // }



if (Number(payment.amount).toFixed(2) !== Number(decoded.total_amount).toFixed(2)) {
  payment.status = "failed";
  await payment.save();

  return res.redirect(
    `${process.env.FRONTEND_URL}/payment-failed?reason=amount_mismatch`
  );
}


    // 4️⃣ Update payment
    payment.status = "success";
    payment.verificationPayload = decoded;
    await payment.save();

    // 5️⃣ Update exam form
    const form = await ExamForm.findById(payment.productId);

    form.paymentStatus = "completed";
    form.paymentDetails = {
      amount: payment.amount,
      method: "esewa",
      transactionId: decoded.transaction_uuid,
      paidAt: new Date(),
    };

    await form.save();

    // 6️⃣ Redirect success
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-success?formId=${form._id}`
    );

  } catch (err) {
    console.error("❌ eSewa success error:", err);
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-failed?reason=verification_failed`
    );
  }
};

/**
 * ESEWA FAILURE CALLBACK
 */
const esewaFailure = async (req, res) => {
  if (req.query.transaction_uuid) {
    await Payment.findOneAndUpdate(
      { transaction_uuid: req.query.transaction_uuid },
      { status: "failed" }
    );
  }

  res.redirect(
    `${process.env.FRONTEND_URL}/payment-failed?reason=user_cancelled`
  );
};

module.exports = {
  initiateEsewaPayment,
  esewaSuccess,
  esewaFailure,
};
