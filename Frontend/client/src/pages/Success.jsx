

// import { useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// export default function Success() {
//   const location = useLocation();
//   const query = new URLSearchParams(location.search);
//   const productId = query.get("product_code"); // Or transactionId

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         await axios.post("http://localhost:5000/api/payment/verify-payment", {
//           transactionId: productId,
//           productId: productId
//         });
//         alert("Payment successful!");
//       } catch (err) {
//         alert("Payment verification failed.",err);
//       }
//     };
//     verifyPayment();
//   }, [productId]);

//   return <h2>Payment Successful! Redirecting...</h2>;
// }


import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const { search } = useLocation();

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(search);
      const data = params.get("data"); // base64 encoded eSewa data

      if (!data) return;

      try {
        const res = await axios.get(`http://localhost:5000/complete-esewa?data=${data}`);
        alert("Payment verified successfully!");
        console.log(res.data);
      } catch (err) {
        console.error(err);
        alert("Payment verification failed");
      }
    };

    verifyPayment();
  }, [search]);

  return <h2>Payment processing...</h2>;
}
