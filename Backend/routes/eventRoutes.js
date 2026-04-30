const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const Activity = require("../models/Activity");
// / Configure multer storage (store files in /uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // folder must exist or create it
  },
  filename: (req, file, cb) => {
    // Unique filename: timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to accept only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });
// CREATE
// router.post("/", async (req, res) => {
//   const event = new Event(req.body);
//   await event.save();
//   res.json(event);
// });

// Upload single image with field name 'image'
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const eventData = req.body;

    // If image uploaded, add its path or URL to eventData
    if (req.file) {
      eventData.imageUrl = `/uploads/${req.file.filename}`; // store relative path
    }

    const event = new Event(eventData);
    await event.save();
      // Automatically add to activity
    await Activity.create({
      title: event.title,
      type: "event",
      refId: event._id,
      category: req.body.category || "General",
      imageUrl: event.imageUrl || null,
      date: event.date,
      summary: event.description?.slice(0, 150) + "..." || "",
    });

    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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

router.get("/all", async (req, res) => {
  const { search = "", category = "" } = req.query;
  const filter = {
    title: { $regex: search, $options: "i" },
    ...(category && { category }),
  };

  const total = await Event.countDocuments(filter);
  const events = await Event.find(filter)
    .sort({ date: -1 })
    // .skip((page - 1) * limit)
    // .limit(parseInt(limit));

  res.json({ total,  events });
});

// UPDATE
// router.put("/:id", async (req, res) => {
//   const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(updated);
// });

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const updatedData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      imageUrl: event.imageUrl, // default old image
    };

    // if new image uploaded
    if (req.file) {
      updatedData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.json({ event: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
