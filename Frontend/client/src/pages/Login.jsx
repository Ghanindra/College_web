import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import Base_Url from '../api/Base_Url'

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${Base_Url}/auth/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
      toast.success("Admin Login Successful")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error("Admin Login Fail")
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Admin Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-field">
          <label htmlFor="email" className="login-label">Email</label>
          <input
            id="email"
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
        </div>
       <div className="login-field login-password-field">
  <label htmlFor="password" className="login-label">Password</label>
  <div className="password-input-wrapper">
    <input
      id="password"
      type={showPassword ? "text" : "password"} 
      className="login-input with-eye"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <span
      className="eye-icon"
      onClick={() => setShowPassword((prev) => !prev)}
      role="button"
      aria-label={showPassword ? "Hide password" : "Show password"}
      tabIndex={0}
    >
      {showPassword ? "🙈" : "👁️"}
    </span>
  </div>
</div>

        {error && <p className="login-error">{error}</p>}
        <button type="submit" className="login-submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}
