const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  category: String,
  imageUrl: String, // <-- new field to store image path or URL
});

module.exports = mongoose.model("Event", eventSchema);