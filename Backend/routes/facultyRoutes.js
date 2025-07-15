const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");
const auth = require("../middleware/auth");
// // CREATE
// router.post("/", async (req, res) => {
//   const faculty = new Faculty(req.body);
//   await faculty.save();
//   res.json(faculty);
// });

// // READ all faculties
// router.get("/", async (req, res) => {
//   const faculties = await Faculty.find();
//   res.json(faculties);
// });

// // READ single faculty by ID
// router.get("/:id", async (req, res) => {
//   const faculty = await Faculty.findById(req.params.id);
//   res.json(faculty);
// });

// // UPDATE faculty by ID
// router.put("/:id", auth,async (req, res) => {
//   const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

// // DELETE faculty by ID
// router.delete("/:id",auth, async (req, res) => {
//   await Faculty.findByIdAndDelete(req.params.id);
//   res.json({ message: "Faculty deleted" });
// });

// module.exports = router;

// CREATE
router.post("/", auth, async (req, res) => {
  try {
    console.log("Received data:", req.body); // Debug print
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.json(faculty);
  } catch (err) {
    console.error("Faculty save error:", err);
    res.status(400).json({ message: err.message || "Bad Request" });
  }
});


// READ all
router.get("/", async (req, res) => {
  const faculties = await Faculty.find();
  res.json(faculties);
});

// READ by ID
router.get("/:id", async (req, res) => {
  const faculty = await Faculty.findById(req.params.id);
  res.json(faculty);
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  const updated = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE
router.delete("/:id", auth, async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);
  res.json({ message: "Faculty deleted" });
});
module.exports = router;