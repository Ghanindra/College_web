const express = require("express");
const multer = require("multer");
const Gallery = require("../models/Gallery");
const router = express.Router();
const auth = require("../middleware/auth");
// Set up multer to save images to /uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// POST - Upload Image
router.post("/", upload.single("image"), auth(), async (req, res) => {
  const { title, description, category } = req.body; // include category
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

  const img = new Gallery({ title, description, imageUrl, category });
  await img.save();
  res.json(img);
});
// galleryRoutes.js


router.put(
  "/:id",
  auth(),
  upload.single("image"),        // optional single file
  async (req, res) => {
    const update = {
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
    };
    if (req.file) update.image = req.file.filename;

    await Gallery.findByIdAndUpdate(req.params.id, update);
    res.json({ message: "Updated" });
  }
);

router.get("/", async (req, res) => {
  const category = req.query.category;

  const filter = category ? { category } : {};
  const gallery = await Gallery.find(filter).sort({ uploadedAt: -1 });

  res.json(gallery);
});

// DELETE - Remove Image
router.delete("/:id",auth(), async (req, res) => {
  await Gallery.findByIdAndDelete(req.params.id);
  res.json({ message: "Image deleted" });
});

module.exports = router;
