const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const auth = require("../middleware/auth");
// CREATE
router.post("/",auth, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json(course);
});

// READ with pagination & filter
router.get("/", async (req, res) => {
  const { page = 1, limit = 5, search = "", faculty = "" } = req.query;
  const filter = {
    name: { $regex: search, $options: "i" },
    ...(faculty && { faculty }),
  };

  const total = await Course.countDocuments(filter);
  const courses = await Course.find(filter)
    .sort({ name: 1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.json({ total, page, totalPages: Math.ceil(total / limit), courses });
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
