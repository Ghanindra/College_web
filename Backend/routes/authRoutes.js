const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Register Admin (One time only)
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await Admin.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Admin({
      name,
      email,
      password: hashedPassword,
      role: "admin", // 
    });

    await newUser.save();

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login Admin
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email});

  if (!admin) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});

module.exports = router;
