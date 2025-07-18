

const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: String,
  dean: String, // optional - head of department
  establishedYear: Number,
  website: String, // optional link to main TU page for the faculty
});

module.exports = mongoose.model("Faculty", facultySchema);
