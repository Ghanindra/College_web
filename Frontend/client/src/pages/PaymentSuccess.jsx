

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";

// export default function PaymentSuccess() {
//   const { search } = useLocation();

//   useEffect(() => {
//     const verifyPayment = async () => {
//       const params = new URLSearchParams(search);
//       const data = params.get("data"); // base64 encoded eSewa data

//       if (!data) return;

//       try {
//         const res = await axios.get(`http://localhost:5000/esewa/success`);
//         alert("Payment verified successfully!");
//         console.log(res.data);
//       } catch (err) {
//         console.error(err);
//         alert("Payment verification failed");
//       }
//     };

//     verifyPayment();
//   }, [search]);

//   return <h2>Payment processing...</h2>;
// }


// pages/PaymentSuccess.jsx
import React from 'react'
import {  useSearchParams ,Link} from "react-router-dom";
// import StudentDashboard from '../pages/StudentDashboard'
// const navigation=useNavigation()
export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const formId = searchParams.get("formId");
   const amount = searchParams.get("amount");
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>✅ Payment Successful!</h1>
      <p>Form ID: {formId}</p>
       <p>Amount Paid: Rs. {amount}</p>
                  <p className="breadcrumb"><Link to="/student">Student Dashboard</Link></p>
    </div>
  );
}
