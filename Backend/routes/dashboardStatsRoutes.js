const express = require("express");
const router  = express.Router();
const Notice  = require("../models/Notice");
const Event   = require("../models/Event");
const ExamForm = require("../models/ExamForm");   // adjust path if needed

// GET /api/stats/dashboard-stats
router.get("/dashboard-stats", async (_req, res) => {
  try {
    const [noticeCount, eventCount, formCount] = await Promise.all([
      Notice.countDocuments(),
      Event.countDocuments(),
      ExamForm.countDocuments(),
    ]);
    res.json({ noticeCount, eventCount, formCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;