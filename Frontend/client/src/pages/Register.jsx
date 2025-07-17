import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created successfully. Please log in.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Admin Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-field">
          <label htmlFor="name" className="register-label">Name</label>
          <input
            id="name"
            type="text"
            className="register-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="register-field">
          <label htmlFor="email" className="register-label">Email</label>
          <input
            id="email"
            type="email"
            className="register-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
       <div className="register-field">
  <label htmlFor="password" className="register-label">Password</label>
  <div className="password-input-wrapper">
    <input
      id="password"
   
      className="register-input with-eye"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <span
      className="eye-icon"
      onClick={() => setShowPassword((prev) => !prev)}
      role="button"
      tabIndex={0}
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? "🙈" : "👁️"}
    </span>
  </div>
</div>
        {error && <p className="register-error">{error}</p>}
        <button type="submit" className="register-submit-btn">
          Register
        </button>
      </form>
    </div>
  );
}
