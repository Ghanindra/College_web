// const mongoose = require("mongoose");

// const facultySchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   head: String,         // Head of Department name
//   description: String,
//   contactEmail: String,
//   contactPhone: String,
// });

// module.exports = mongoose.model("Faculty", facultySchema);


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
