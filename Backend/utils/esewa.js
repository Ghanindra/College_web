



// const crypto = require("crypto");
// const axios = require("axios");

// const REQUIRED_SIGN_FIELDS = [
//   "total_amount",
//   "transaction_uuid",
//   "product_code",
// ];

// function getEsewaPaymentPayload({ amount, transaction_uuid }) {
//   if (!process.env.ESEWA_SECRET_KEY) {
//     throw new Error("ESEWA_SECRET_KEY missing in env");
//   }

//   const payload = {
//     amount: String(amount),
//     tax_amount: "0",
//     product_service_charge: "0",
//     product_delivery_charge: "0",
//     total_amount: String(amount),
//     transaction_uuid, // NEVER touch it
//     product_code: process.env.ESEWA_PRODUCT_CODE || "EPAYTEST",
//     success_url: process.env.ESEWA_SUCCESS_URL,
//     failure_url: process.env.ESEWA_FAILURE_URL,
//   };

//   // 🔒 Build signature string STRICTLY
//   const signatureString = REQUIRED_SIGN_FIELDS
//     .map((field) => `${field}=${payload[field]}`)
//     .join(",");

//   console.log("🔹 Signature Input String:", signatureString);
//  console.log(
//   "SIGN STRING JSON:",
//   JSON.stringify(signatureString)
// );

//   const signature = crypto
//     .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
//     .update(signatureString)
//     .digest("base64");

//   return {
//     ...payload,
//     signed_field_names: REQUIRED_SIGN_FIELDS.join(","),
//     signature,
    
//   };
 
// }

// async function verifyEsewaPayment(encodedData) {
//   const decoded = JSON.parse(
//     Buffer.from(encodedData, "base64").toString("utf8")
//   );

//   const verifyUrl =
//     `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/` +
//     `?product_code=${decoded.product_code}` +
//     `&total_amount=${decoded.total_amount}` +
//     `&transaction_uuid=${decoded.transaction_uuid}`;

//   const response = await axios.get(verifyUrl);

//   if (response.data.status !== "COMPLETE") {
//     throw new Error("Payment not completed");
//   }

//   return decoded;
// }

// module.exports = {
//   getEsewaPaymentPayload,
//   verifyEsewaPayment,
// };


const crypto = require("crypto");
const axios = require("axios");
function getEsewaPaymentPayload({ amount, transaction_uuid }) {
  // const payload = {
  //   amount: String(amount),
  //   tax_amount: "0",
  //   product_service_charge: "0",
  //   product_delivery_charge: "0",
  //   total_amount: amount.toFixed(),
  //   transaction_uuid,
  //   product_code: "EPAYTEST",
  //   // success_url: process.env.ESEWA_SUCCESS_URL,
  //   // failure_url: process.env.ESEWA_FAILURE_URL,
  //    success_url: `${process.env.BACKEND_URL}/esewa/success`,
  //   failure_url: `${process.env.BACKEND_URL}/esewa/failure`,
  // };
const payload = {
  amount: amount.toFixed(2), // "200.00"
  tax_amount: "0.00",
  product_service_charge: "0.00",
  product_delivery_charge: "0.00",
  total_amount: amount.toFixed(2), // "200.00"
  transaction_uuid,
  product_code: "EPAYTEST",
  success_url: `${process.env.BACKEND_URL}/esewa/success`,
  failure_url: `${process.env.BACKEND_URL}/esewa/failure`,
};

  const signed_field_names =
    "total_amount,transaction_uuid,product_code";

 
const signString = signed_field_names
  .split(",")
  .map((field) => `${field}=${payload[field]}`)
  .join(",");

  const signature = crypto
    .createHmac("sha256", process.env.ESEWA_SECRET_KEY.trim())
    .update(signString)
    .digest("base64");

  return {
    ...payload,
    signed_field_names,
    signature,
  };
}

async function verifyEsewaPayment(encodedData) {
  const decoded = JSON.parse(
    Buffer.from(encodedData, "base64").toString("utf8")
  );

  const verifyUrl =
    `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/` +
    `?product_code=${decoded.product_code}` +
    `&total_amount=${decoded.total_amount}` +
    `&transaction_uuid=${decoded.transaction_uuid}`;

  const response = await axios.get(verifyUrl);

  if (response.data.status !== "COMPLETE") {
    throw new Error("Payment not completed");
  }

  return decoded;
}

module.exports = {
  getEsewaPaymentPayload,
  verifyEsewaPayment,
};
