// models/ExamRoutine.js
const mongoose = require('mongoose');

const examRoutineSchema = new mongoose.Schema({
  imageUrl: {
    type: String, // URL or path to the stored image
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ExamRoutine = mongoose.model('ExamRoutine', examRoutineSchema);
module.exports = ExamRoutine;
