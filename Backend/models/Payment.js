

// // const paymentSchema = new mongoose.Schema({
// //   transactionId: { type: String, unique: true },
// //   productId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamForm", required: true },
// //   amount: { type: Number, required: true },
// //   paymentGateway: { type: String, enum: ["eSewa", "Khalti", "Bank"], required: true },
// //   status: { type: String, enum: ["pending", "success", "failed"], default: "pending" },
// //   paymentDate: { type: Date, default: Date.now },
// // });
// // const Payment = mongoose.model("Payment", paymentSchema);

// // module.exports = Payment;

// import mongoose from "mongoose";

// const paymentSchema = new mongoose.Schema(
//   {
//     transactionId: { type: String, unique: true },
//     pidx: { type: String, unique: true },
//      productId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamForm", required: true },
//     //  StudentId: { type: mongoose.Schema.Types.ObjectId, ref: "Students", required: true },
//     amount: { type: Number, required: true },
//     dataFromVerificationReq: { type: Object },
//     apiQueryFromUser: { type: Object },
//     paymentGateway: {
//       type: String,
//       enum: ["khalti", "esewa", "bank"],
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ["success", "pending", "failed"],
//       default: "pending",
//     },
//     paymentDate: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// export default paymentSchema;

// models/Payment.js
const mongoose =require("mongoose") ;

const paymentSchema = new mongoose.Schema({
  transaction_uuid: { type: String, required: true, unique: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "ExamForm", required: true },
  amount: { type: Number, required: true },

  paymentGateway: {
    type: String,
    enum: ["esewa", "khalti", "bank"],
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },

  verificationPayload: Object,
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
