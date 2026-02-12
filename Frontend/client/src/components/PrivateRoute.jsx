

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

// export default function PrivateRoute({ children, roles = [] }) {
//   const { token } = useAuth();

//   if (!token) return <Navigate to="/login" />;

//   const userRole = JSON.parse(atob(token.split(".")[1])).role;
  
//   console.log("PrivateRoute check → userRole:", userRole, "allowedRoles:", roles);

//   if (roles.length && !roles.includes(userRole)) return <Navigate to="/" />;

//   return children;
// }


export default function PrivateRoute({ children, roles = [] }) {
  const { user, token } = useAuth();

  if (!token || !user) return <Navigate to="/login" />;

  const userRole = user.role;

  if (roles.length && !roles.includes(userRole)) return <Navigate to="/" />;

  return children;
}
