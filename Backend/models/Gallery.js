// models/Gallery.js
const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: { type: String, required: true }, // <- ADD THIS
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
