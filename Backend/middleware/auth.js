// const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) return res.status(401).json({ message: "Access Denied" });

//   // Extract the token part from "Bearer <token>"
//   const token = authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access Denied" });

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.admin = verified;
//     next();
//   } catch {
//     res.status(400).json({ message: "Invalid Token" });
//   }
// };

// const jwt = require("jsonwebtoken");

// // Authenticate token middleware
// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1]; // Bearer token
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // {id, role}
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// }

// // Role-based authorization
// function authorizeRoles(...roles) {
//   return (req, res, next) => {
//     if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Forbidden" });
//     next();
//   };
// }

// module.exports = { authenticateToken, authorizeRoles };


// auth.js
// const jwt = require("jsonwebtoken");

// function auth(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: "Invalid or expired token" });
//   }
// }

// module.exports = auth;



const jwt = require("jsonwebtoken");

/**
 * Auth middleware
 * Usage:
 * 1. Just authenticate: auth()
 * 2. Authenticate + allow specific role(s): auth("admin")
 */
function auth(...allowedRoles) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer token
    if (!token) return res.status(401).json({ message: "No token provided" });
console.log("token",token);

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // {id, role}
console.log(req.user);

      // If roles are specified, check them
      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden: insufficient rights" });
      }

      next();
    } catch (err) {
      console.error("Auth error:", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
  };
}

module.exports = auth;
