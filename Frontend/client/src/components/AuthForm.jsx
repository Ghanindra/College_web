import { useState } from "react";
import { login, register as registerAPI } from "../api/Auth";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [error, setError] = useState("");

  const { setToken } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        const data = await login({ email, password });
        setToken(data.token); // save token in context/localStorage
 toast.success("Student Login Successful")
        // decode JWT safely
        const payload = JSON.parse(atob(data.token.split(".")[1]));
        console.log("JWT payload:", payload); // debug

        if (payload.role === "admin") navigate("/dashboard");
        else navigate("/student"); // navigate student dashboard
        // console.log("navigate to student");
        // console.log("role",payload.role);
        
      } else {
        if (!name.trim()) {
          setError("Name is required");
          return;
        }
        await registerAPI({ name, email, password, role });
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
        setName("");
        setEmail("");
        setPassword("");
        setRole("student");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        {!isLogin && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ display: "block", width: "100%", marginBottom: "10px" }}
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        )}

        <button type="submit" style={{ width: "100%", padding: "10px" }}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
          style={{
            color: "blue",
            border: "none",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          {isLogin ? "Register here" : "Login here"}
        </button>
      </p>
    </div>
  );
}
