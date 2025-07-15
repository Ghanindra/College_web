const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  image: String,       // URL or filename (optional)
  category: String      // e.g., Seminar, Admission, Sports
});

module.exports = mongoose.model("Event", eventSchema);