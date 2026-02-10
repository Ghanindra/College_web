


// // utils/esewa.js
// const crypto = require("crypto");
// const axios = require("axios");


// function getEsewaPaymentPayload({ amount, transaction_uuid }) {
//   const payload = {
//     amount: amount.toString(),
//     tax_amount: "0",
//     service_charge: "0",
//     product_service_charge: "0",
//     product_delivery_charge: "0",
//     total_amount: amount.toString(),
//     transaction_uuid,
//     product_code: process.env.ESEWA_PRODUCT_CODE, // EPAYTEST
//     success_url: "http://localhost:5000/esewa/success",
//     failure_url: "http://localhost:5000/esewa/failure",
//   };

//   const signedFieldNames = 
//     "total_amount,transaction_uuid,product_code,amount,tax_amount,service_charge,product_service_charge,product_delivery_charge";

//   const signatureString = signedFieldNames
//     .split(",")
//     .map((key) => `${key}=${payload[key]}`)
//     .join(",");

//   const signature = crypto
//     .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
//     .update(signatureString)
//     .digest("base64");

//   return {
//     ...payload,
//     signed_field_names: signedFieldNames,
//     signature,
//   };
// }


// // module.exports = { getEsewaPaymentPayload };

// async function verifyEsewaPayment(encodedData) {
//   const decoded = JSON.parse(Buffer.from(encodedData, "base64").toString("utf8"));

//   const verifyUrl = `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decoded.total_amount}&transaction_uuid=${decoded.transaction_uuid}`;

//   const response = await axios.get(verifyUrl);

//   if (response.data.status !== "COMPLETE") {
//     throw new Error("Payment not completed");
//   }

//   return decoded;
// }

// module.exports = {
//  getEsewaPaymentPayload ,
//   verifyEsewaPayment
// };

// utils/esewa.js
const crypto = require("crypto");
const axios = require("axios");

/**
 * Generate eSewa payment payload
 * All fields included, but signature only for 3 fields
 */
// backend: utils/esewa.js
function getEsewaPaymentPayload({ amount, transaction_uuid }) {
  const payload = {
    amount: amount.toString(),
    tax_amount: "0",
    product_service_charge: "0",
    product_delivery_charge: "0",
    total_amount: amount.toString(),
    transaction_uuid:transaction_uuid,
    product_code: process.env.ESEWA_PRODUCT_CODE,
    // success_url: "http://localhost:5000/esewa/success",
    // failure_url: "http://localhost:5000/esewa/failure",
  };

  const signedFieldNames = "total_amount,transaction_uuid,product_code,amount,tax_amount,product_service_charge,product_delivery_charge";

  const signatureString = signedFieldNames
    .split(",")
    .map((key) => `${key}=${payload[key]}`)
    .join(",");

  const signature = crypto
    .createHmac("sha256", process.env.ESEWA_SECRET_KEY)
    .update(signatureString)
    .digest("base64");

  return {
    ...payload,
    signed_field_names: signedFieldNames,
    signature,
  };
}


/**
 * Verify eSewa payment
 */
async function verifyEsewaPayment(encodedData) {
  const decoded = JSON.parse(Buffer.from(encodedData, "base64").toString("utf8"));

  const verifyUrl = `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decoded.total_amount}&transaction_uuid=${decoded.transaction_uuid}`;

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
