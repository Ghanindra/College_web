const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Register Admin (One time only)
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const existing = await Admin.findOne({ email });
  if (existing) return res.status(400).json({ message: "User exists" });

  const hashed = await bcrypt.hash(password, 10);
  const admin = new Admin({ email, password: hashed });
  await admin.save();
  res.json({ message: "Admin created" });
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
