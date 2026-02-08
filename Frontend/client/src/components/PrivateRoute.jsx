
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/useAuth";

// // Protect any route
// const PrivateRoute = ({ children, roles = [] }) => {
//   const { user } = useAuth();

//   if (!user) return <Navigate to="/login" />;

//   if (roles.length && !roles.includes(user.role)) return <Navigate to="/login" />;

//   return children;
// };

// export default PrivateRoute;


import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function PrivateRoute({ children, roles = [] }) {
  const { token } = useAuth();

  if (!token) return <Navigate to="/login" />;

  const userRole = JSON.parse(atob(token.split(".")[1])).role;
  
  console.log("PrivateRoute check → userRole:", userRole, "allowedRoles:", roles);

  if (roles.length && !roles.includes(userRole)) return <Navigate to="/" />;

  return children;
}
