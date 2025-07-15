const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: String,
  code: String,
  credit: Number,
  semester: String,
  faculty: String // e.g., BSc, BBS, etc.
});

module.exports = mongoose.model("Course", courseSchema);
