// routes/activityRoutes.js
const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: "Failed to load activities" });
  }
});

module.exports = router;
