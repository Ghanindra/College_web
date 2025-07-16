const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["notice", "event"],
    required: true,
  },
  refId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "type", // dynamic reference to either 'Notice' or 'Event'
  },
  category: {
    type: String,
    default: "General",
  },
  imageUrl: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  summary: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);
