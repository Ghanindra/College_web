const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: {
    type: Date,
    default: Date.now,
  },
  category: String,
});

module.exports = mongoose.model("Notice", noticeSchema);
