const express = require("express");
const router = express.Router();
const Notice = require("../models/Notice");
const auth = require("../middleware/auth");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");
// CREATE
router.post("/", auth, async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
   // Automatically add to activity
    await Activity.create({
      title: notice.title,
      type: "notice",
      refId: notice._id,
      category: req.body.category || "General",
      imageUrl: notice.imageUrl || null,
      date: notice.date,
      summary: notice.content?.slice(0, 150) + "..." || "",
    });
  res.json(notice);
});

router.get("/all", async (req, res) => {
  try {
     const notices = await Notice.find().sort({ date: -1 });
     res.json(notices);
   } catch (error) {
     res.status(500).json({ error: error.message });
   }
 });
// READ (with pagination & search)
router.get("/", async (req, res) => {
  const { page = 1, limit = 5, search = "", category = "" } = req.query;
  const filter = {
    title: { $regex: search, $options: "i" },
    ...(category && { category }),
  };



router.get("/:id", async (req, res) => {
   console.log("Fetching notice by ID:", req.params.id);
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid notice ID" });
  }

  try {
    const notice = await Notice.findById(id);
    if (!notice) return res.status(404).json({ message: "Not Found" });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

  const total = await Notice.countDocuments(filter);
  const notices = await Notice.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ total, page, totalPages: Math.ceil(total / limit), notices });
});

// UPDATE
router.put("/:id",auth ,async (req, res) => {
  const updated = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id",auth, async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
