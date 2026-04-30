

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Students");
const Admin = require("../models/Admin");
// --- REGISTER ---
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email, and password are required" });

  try {
    const existingUser = await Student.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = new Student({
      name,
      email,
      password: hashedPassword,
      role: role || "student" // default to student
    });

    await newStudent.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- LOGIN ---
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({ message: "Email and password are required" });

//   try {
//     const student = await Student.findOne({ email });
//     if (!student) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

//     // JWT Token
//     const token = jwt.sign(
//       { id: student._id, role: student.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "1d" }
//     );

//     res.json({
//       token,
//       student: { id:student._id, name: student.name, email: student.email, role: student.role }
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {

    // 1️⃣ Check Student first
    let user = await Student.findOne({ email });

    // 2️⃣ If not student, check Admin
    let role = "student";

    if (!user) {
      user = await Admin.findOne({ email });
      role = "admin";
    }

    if (!user)
      return res.status(400).json({ message: "User not found" });

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // 4️⃣ Create JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
module.exports = router;
