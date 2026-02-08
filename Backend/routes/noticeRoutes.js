const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const Activity = require("../models/Activity");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");

// Helper function to create activity from notice
async function createActivityFromNotice(notice, category) {
  try {
    await Activity.create({
      title: notice.title,
      type: "notice",
      refId: notice._id,
      category: category || "General",
      imageUrl: notice.imageUrl || null,
      date: notice.date || new Date(),
      summary: (notice.content?.slice(0, 150) || "") + "...",
    });
  } catch (err) {
    console.error("Error creating activity:", err);
  }
}

// ---------------------------
// ROUTES
// ---------------------------

// CREATE Notice → admin only
router.post("/", auth("admin"), async (req, res) => {
  try {
    const notice = new Notice(req.body);
    await notice.save();

    await createActivityFromNotice(notice, req.body.category);

    res.status(201).json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET all notices → public or any logged-in user
router.get("/all", async (req, res) => {
  try {
    const notices = await Notice.find().sort({ date: -1 });
    res.json(notices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET notices with pagination & search → public or any logged-in user
router.get("/", async (req, res) => {
  const { page = 1, limit = 5, search = "", category = "" } = req.query;

  const filter = {
    title: { $regex: search, $options: "i" },
    ...(category && { category }),
  };

  try {
    const total = await Notice.countDocuments(filter);
    const notices = await Notice.find(filter)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      notices,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET single notice by ID → public or any logged-in user
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid notice ID" });

  try {
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ message: "Notice not found" });

    res.json(notice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE notice by ID → admin only
router.put("/:id", auth("admin"), async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid notice ID" });

  try {
    const updated = await Notice.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Notice not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE notice by ID → admin only
router.delete("/:id", auth("admin"), async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "Invalid notice ID" });

  try {
    const deleted = await Notice.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Notice not found" });

    res.json({ message: "Notice deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
