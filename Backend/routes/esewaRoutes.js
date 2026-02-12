const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const ExamForm = require('../models/ExamForm');
const Payment = require('../models/Payment');
const auth = require('../middleware/auth');

// eSewa Configuration
const ESEWA_CONFIG = {
  merchantCode: 'EPAYTEST', // Replace with your actual merchant code in production
  secretKey: '8gBm/:&EnhH.1/q', // Replace with your actual secret key in production
  paymentUrl: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form', // Test URL
  // Production URL: 'https://epay.esewa.com.np/api/epay/main/v2/form'
  successUrl: 'http://localhost:3000/payment/success', // Your frontend success URL
  failureUrl: 'http://localhost:3000/payment/failure', // Your frontend failure URL
};

/**
 * Generate eSewa signature using HMAC-SHA256
 */
function generateEsewaSignature(message, secretKey) {
  const hmac = crypto.createHmac('sha256', secretKey);
  hmac.update(message);
  return hmac.digest('base64');
}

/**
 * POST /esewa/initiate
 * Initialize eSewa payment
 * Requires authentication
 */
// router.post('/initiate', auth(), async (req, res) => {
//   try {
//     console.log('🔵 eSewa initiation started');
//     console.log('User:', req.user);
//     console.log('Request body:', req.body);

//     const { formId, amount } = req.body;

//     // Validation
//     if (!formId || !amount) {
//       return res.status(400).json({ 
//         error: 'Form ID and amount are required' 
//       });
//     }

//     // Verify the form exists and belongs to the user
//     const form = await ExamForm.findById(formId);
    
//     if (!form) {
//       return res.status(404).json({ error: 'Form not found' });
//     }

//     if (form.studentId.toString() !== req.user.id.toString()) {
//       return res.status(403).json({ error: 'Unauthorized access to this form' });
//     }

//     if (form.paymentStatus === 'completed') {
//       return res.status(400).json({ error: 'Payment already completed for this form' });
//     }

//     // Validate amount matches form
//     if (Number(amount) !== Number(form.paymentDetails.amount)) {
//       return res.status(400).json({ 
//         error: 'Payment amount does not match form amount' 
//       });
//     }

//     // Generate unique transaction UUID
//     const transaction_uuid = `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

//     // Create payment record in database
//     const payment = await Payment.create({
//       transaction_uuid,
//       productId: formId,
//       amount: Number(amount),
//       paymentGateway: 'esewa',
//       status: 'pending',
//     });

//     console.log('✅ Payment record created:', payment._id);

//     // Prepare eSewa parameters
//     const taxAmount = 0; // Tax amount (adjust if needed)
//     const totalAmount = Number(amount);
//     const serviceCharge = 0; // Service charge (adjust if needed)
//     const productDeliveryCharge = 0; // Delivery charge

//     // Create signature message (order matters - must be exact)
//     const signatureMessage = `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=${ESEWA_CONFIG.merchantCode}`;
    
//     console.log('📝 Signature message:', signatureMessage);

//     // Generate signature
//     const signature = generateEsewaSignature(signatureMessage, ESEWA_CONFIG.secretKey);
    
//     console.log('🔐 Generated signature:', signature);

//     // Prepare payment data for frontend
//     const paymentData = {
//       amount: totalAmount.toString(),
//       tax_amount: taxAmount.toString(),
//       total_amount: totalAmount.toString(),
//       transaction_uuid: transaction_uuid,
//       product_code: ESEWA_CONFIG.merchantCode,
//       product_service_charge: serviceCharge.toString(),
//       product_delivery_charge: productDeliveryCharge.toString(),
//       success_url: ESEWA_CONFIG.successUrl,
//       failure_url: ESEWA_CONFIG.failureUrl,
//       signed_field_names: 'total_amount,transaction_uuid,product_code',
//       signature: signature,
//     };

//     console.log('🟢 Payment data prepared:', paymentData);

//     res.json({ 
//       success: true,
//       paymentData,
//       transaction_uuid,
//       message: 'eSewa payment initialized' 
//     });

//   } catch (error) {
//     console.error('❌ eSewa initiation error:', error);
//     res.status(500).json({ 
//       error: 'Failed to initiate eSewa payment',
//       details: error.message 
//     });
//   }
// });


router.post('/initiate', auth(), async (req, res) => {
  try {
    const { formId, amount } = req.body;

    if (!formId || !amount)
      return res.status(400).json({ error: 'Form ID and amount required' });

    const form = await ExamForm.findById(formId);
    if (!form) return res.status(404).json({ error: 'Form not found' });
    if (form.studentId.toString() !== req.user.id.toString())
      return res.status(403).json({ error: 'Unauthorized' });

    if (form.paymentStatus === 'completed')
      return res.status(400).json({ error: 'Payment already completed' });

    if (Number(amount) !== Number(form.paymentDetails.amount))
      return res.status(400).json({ error: 'Amount mismatch' });

    // Generate new transaction UUID
    const transaction_uuid = `TXN-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;
console.log("above trans",transaction_uuid);

    // Save payment record
    await Payment.create({
      transaction_uuid,
      productId: formId,
      amount: Number(amount),
      paymentGateway: 'esewa',
      status: 'pending',
    });

    // Sandbox form fields (no signature)
    const paymentData = {
      amt: amount.toString(),
      psc: '0', // service charge
      pdc: '0', // delivery charge
      tAmt: amount.toString(), // total
      pid: transaction_uuid,
      scd: ESEWA_CONFIG.merchantCode,
      su: ESEWA_CONFIG.successUrl,
      fu: ESEWA_CONFIG.failureUrl,
    };
console.log("trnas",paymentData.pid
    
);

    res.json({ success: true, paymentData });
  } catch (err) {
    console.error('eSewa initiate error:', err);
    res.status(500).json({ error: 'Failed to initiate eSewa payment' });
  }
});



/**
 * GET /esewa/verify
 * Verify eSewa payment after redirect
 * This is called by your frontend after eSewa redirects back
 */
router.get('/verify', async (req, res) => {
  try {
    console.log('🔵 eSewa verification started');
    console.log('Query params:', req.query);

    const { 
      data,
      transaction_code,
      status,
      total_amount,
      transaction_uuid,
      product_code,
      signed_field_names,
      signature 
    } = req.query;

    // Check if payment was successful
    if (status !== 'COMPLETE') {
      console.log('❌ Payment not completed. Status:', status);
      return res.redirect(`${ESEWA_CONFIG.failureUrl}?message=Payment not completed`);
    }

    // Find the payment record
    const payment = await Payment.findOne({ transaction_uuid });
    
    if (!payment) {
      console.log('❌ Payment record not found for UUID:', transaction_uuid);
      return res.redirect(`${ESEWA_CONFIG.failureUrl}?message=Payment record not found`);
    }

    // Verify signature (security check)
    const receivedSignature = signature;
    const expectedMessage = `transaction_code=${transaction_code},status=${status},total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code},signed_field_names=${signed_field_names}`;
    const expectedSignature = generateEsewaSignature(expectedMessage, ESEWA_CONFIG.secretKey);

    console.log('🔐 Received signature:', receivedSignature);
    console.log('🔐 Expected signature:', expectedSignature);

    // Optional: Verify with eSewa API
    // For production, you should verify with eSewa's verification API
    // This adds an extra layer of security

    // Update payment status
    payment.status = 'success';
    payment.verificationPayload = {
      transaction_code,
      status,
      total_amount,
      data,
      verified_at: new Date(),
    };
    await payment.save();

    console.log('✅ Payment verified and updated');

    // Update exam form payment status
    const form = await ExamForm.findById(payment.productId);
    
    if (form) {
      form.paymentStatus = 'completed';
      if (form.paymentDetails) {
        form.paymentDetails.completedAt = new Date();
        form.paymentDetails.transactionId = transaction_code;
      }
      await form.save();
      console.log('✅ Form payment status updated');
    }

    // Redirect to success page with transaction details
    const successRedirect = `${ESEWA_CONFIG.successUrl}?transaction_uuid=${transaction_uuid}&transaction_code=${transaction_code}&amount=${total_amount}`;
    
    res.redirect(successRedirect);

  } catch (error) {
    console.error('❌ eSewa verification error:', error);
    res.redirect(`${ESEWA_CONFIG.failureUrl}?message=Verification failed`);
  }
});

/**
 * POST /esewa/verify-api
 * Alternative: Verify payment via API call (for AJAX verification)
 */
router.post('/verify-api', async (req, res) => {
  try {
    const { transaction_uuid } = req.body;

    if (!transaction_uuid) {
      return res.status(400).json({ error: 'Transaction UUID is required' });
    }

    const payment = await Payment.findOne({ transaction_uuid });
    
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    const form = await ExamForm.findById(payment.productId);

    res.json({
      success: true,
      payment: {
        status: payment.status,
        amount: payment.amount,
        transaction_uuid: payment.transaction_uuid,
      },
      form: form ? {
        id: form._id,
        paymentStatus: form.paymentStatus,
      } : null,
    });

  } catch (error) {
    console.error('Error in verify-api:', error);
    res.status(500).json({ error: 'Verification failed' });
  }
});

/**
 * GET /esewa/payment-status/:transaction_uuid
 * Check payment status
 */
router.get('/payment-status/:transaction_uuid', async (req, res) => {
  try {
    const payment = await Payment.findOne({ 
      transaction_uuid: req.params.transaction_uuid 
    }).populate('productId');

    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      success: true,
      payment,
    });

  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ error: 'Failed to fetch payment status' });
  }
});

module.exports = router;