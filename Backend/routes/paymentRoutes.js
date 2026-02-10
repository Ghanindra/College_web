// // routes/esewaRoutes.js
// import express from 'express';
// import { initiateEsewaPayment, verifyEsewaPayment } from "../controllers/esewaController.js";

// const router = express.Router();

// router.post("/initiate-payment", initiateEsewaPayment);
// router.post("/verify-payment", verifyEsewaPayment);

// export default router;


const express = require("express");
const { initiateEsewaPayment, verifyEsewaPayment } = require("../controllers/esewaController.js"); // CommonJS require

const router = express.Router();

router.post("/initiate-payment", initiateEsewaPayment);
router.post("/verify-payment", verifyEsewaPayment);

module.exports = router; // must use module.exports
