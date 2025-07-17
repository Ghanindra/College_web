// components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Optional for JWT validation

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Basic existence check
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Optional: Validate JWT expiry if using real tokens
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      localStorage.removeItem("token");
      return <Navigate to="/login" />;
    }
  } catch (err) {
    localStorage.removeItem("token");
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
