// import React,{ StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { BrowserRouter } from "react-router-dom";
// import './index.css'
// import { ToastContainer } from 'react-toastify';
// import App from './App.jsx'
// import { AuthProvider } from "./context/AuthProvider";

// // --- ADD THIS AT THE TOP ---
// if (!window.grecaptcha) {
//   window.grecaptcha = {
//     ready: (cb) => cb(),
//     execute: () => "",
//     getResponse: () => "",
//   };
// }
// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <> 
//      <AuthProvider>
//               <BrowserRouter>
//                 <App />
//                 </BrowserRouter>
 
//         </AuthProvider>
 
    
//     <ToastContainer />
//     </>
       
//   </StrictMode>,
// )

import React from "react";   // ✅ ADD THIS
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import { AuthProvider } from "./context/AuthProvider";

// --- ADD THIS AT THE TOP ---
if (!window.grecaptcha) {
  window.grecaptcha = {
    ready: (cb) => cb(),
    execute: () => "",
    getResponse: () => "",
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>

      <ToastContainer />
    </>
  </StrictMode>
);
