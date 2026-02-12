// controllers/esewaTestController.js
const crypto = require("crypto");

const testEsewaForm = (req, res) => {
  console.log("🧪 Test eSewa Form Page Requested");

  // Generate test data
  const testAmount = "100";
  const testTransactionUuid = `test-${Date.now()}`;
  const productCode = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
  const secretKey = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";

  // Build signature
  const signatureString = `total_amount=${testAmount},transaction_uuid=${testTransactionUuid},product_code=${productCode}`;
  
  console.log("🔹 Signature String:", signatureString);
  console.log("🔹 Secret Key:", secretKey);

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(signatureString)
    .digest("base64");

  console.log("🔹 Generated Signature:", signature);

  // Create HTML form that auto-submits
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>eSewa Test Payment</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #60bb46;
      text-align: center;
    }
    .info {
      background: #f9f9f9;
      padding: 15px;
      border-radius: 5px;
      margin: 20px 0;
    }
    .info-item {
      margin: 10px 0;
      padding: 8px;
      background: white;
      border-left: 3px solid #60bb46;
    }
    button {
      width: 100%;
      padding: 15px;
      background: #60bb46;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 20px;
    }
    button:hover {
      background: #4fa838;
    }
    .auto-submit-msg {
      text-align: center;
      color: #666;
      margin-top: 10px;
      font-size: 14px;
    }
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🧪 eSewa Test Payment</h1>
    
    <div class="info">
      <h3>Test Payment Details:</h3>
      <div class="info-item">
        <strong>Amount:</strong> NPR ${testAmount}
      </div>
      <div class="info-item">
        <strong>Transaction UUID:</strong> <code>${testTransactionUuid}</code>
      </div>
      <div class="info-item">
        <strong>Product Code:</strong> <code>${productCode}</code>
      </div>
      <div class="info-item">
        <strong>Signature:</strong> <code style="word-break: break-all;">${signature}</code>
      </div>
      <div class="info-item">
        <strong>Signature String:</strong> <code style="word-break: break-all;">${signatureString}</code>
      </div>
    </div>

    <form id="esewaForm" action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
      <input type="hidden" name="amount" value="${testAmount}" />
      <input type="hidden" name="tax_amount" value="0" />
      <input type="hidden" name="total_amount" value="${testAmount}" />
      <input type="hidden" name="transaction_uuid" value="${testTransactionUuid}" />
      <input type="hidden" name="product_code" value="${productCode}" />
      <input type="hidden" name="product_service_charge" value="0" />
      <input type="hidden" name="product_delivery_charge" value="0" />
      <input type="hidden" name="success_url" value="http://localhost:5000/esewa/test/success" />
      <input type="hidden" name="failure_url" value="http://localhost:5000/esewa/test/failure" />
      <input type="hidden" name="signed_field_names" value="total_amount,transaction_uuid,product_code" />
      <input type="hidden" name="signature" value="${signature}" />
      
      <button type="submit">🚀 Submit to eSewa (Manual)</button>
    </form>

    <div class="auto-submit-msg">
      Or wait 3 seconds for auto-submit...
    </div>

    <script>
      // Auto-submit after 3 seconds (optional)
      setTimeout(() => {
        console.log("Auto-submitting to eSewa...");
        document.getElementById('esewaForm').submit();
      }, 3000);
    </script>
  </div>
</body>
</html>
  `;

  res.send(html);
};

const testEsewaSuccess = (req, res) => {
  console.log("✅ Test eSewa Success Callback");
  console.log("Query params:", req.query);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>eSewa Test - Success</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 {
      color: #4caf50;
    }
    .success-icon {
      font-size: 64px;
      margin: 20px 0;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      text-align: left;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="success-icon">✅</div>
    <h1>Payment Successful!</h1>
    <p>Your test payment was completed successfully.</p>
    
    <h3>Response Data:</h3>
    <pre>${JSON.stringify(req.query, null, 2)}</pre>

    <p style="margin-top: 30px;">
      <a href="/esewa/test" style="color: #60bb46; text-decoration: none; font-weight: bold;">← Test Again</a>
    </p>
  </div>
</body>
</html>
  `;

  res.send(html);
};

const testEsewaFailure = (req, res) => {
  console.log("❌ Test eSewa Failure Callback");
  console.log("Query params:", req.query);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>eSewa Test - Failure</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .container {
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 {
      color: #f44336;
    }
    .failure-icon {
      font-size: 64px;
      margin: 20px 0;
    }
    pre {
      background: #f4f4f4;
      padding: 15px;
      border-radius: 5px;
      text-align: left;
      overflow-x: auto;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="failure-icon">❌</div>
    <h1>Payment Failed</h1>
    <p>Your test payment was cancelled or failed.</p>
    
    <h3>Response Data:</h3>
    <pre>${JSON.stringify(req.query, null, 2)}</pre>

    <p style="margin-top: 30px;">
      <a href="/esewa/test" style="color: #60bb46; text-decoration: none; font-weight: bold;">← Try Again</a>
    </p>
  </div>
</body>
</html>
  `;

  res.send(html);
};

module.exports = {
  testEsewaForm,
  testEsewaSuccess,
  testEsewaFailure,
};