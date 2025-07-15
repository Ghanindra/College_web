const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");
// CREATE
router.post("/", async (req, res) => {
  const event = new Event(req.body);
  await event.save();
  res.json(event);
});

// READ with pagination & search
router.get("/", async (req, res) => {
  const { page = 1, limit = 5, search = "", category = "" } = req.query;
  const filter = {
    title: { $regex: search, $options: "i" },
    ...(category && { category }),
  };

  const total = await Event.countDocuments(filter);
  const events = await Event.find(filter)
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ total, page, totalPages: Math.ceil(total / limit), events });
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
