const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/dashboard", auth("student"), (req, res) => {
  res.json({ message: `Welcome Student ${req.user.id}` });
});

module.exports = router;
