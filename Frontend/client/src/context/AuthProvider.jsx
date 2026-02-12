import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {jwtDecode} from "jwt-decode"; // ✅ default import

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(() => localStorage.getItem("token"));

//   useEffect(() => {
//     console.log("AuthProvider useEffect → token:", token);

//     if (!token) {
//       setUser(null);
//       localStorage.removeItem("token");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token); // ✅ decode token
//       console.log("Decoded JWT payload:", decoded);
//       setUser(decoded);
//       localStorage.setItem("token", token);
//     } catch (err) {
//       console.error("Error decoding token:", err);
//       setToken(null);
//       setUser(null);
//     }
//   }, [token]);

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, setToken, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const token = localStorage.getItem("token");
      return token ? jwtDecode(token) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
        localStorage.setItem("token", token);
      } catch (err) {
        console.error("Invalid token:", err);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
