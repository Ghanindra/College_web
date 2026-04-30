
// import { useNavigate } from "react-router-dom";

// const PaymentFailed = () => {
//   const navigate = useNavigate();
//   return (
//     <div>
//       <h1>Payment Failed!</h1>
//       <p>There was an issue with your payment. Please try again.</p>
//       <button onClick={() => navigate("/")} className="go-home-button">
//         Go to Homepage
//       </button>
//     </div>
//   )
// };

// export default PaymentFailed;


// pages/PaymentFailed.jsx
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const reason = searchParams.get("reason");

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>❌ Payment Failed</h1>
      <p>Reason: {reason}</p>
    </div>
  );
}
