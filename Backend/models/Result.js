// // models/Result.js
// const mongoose = require('mongoose');

// const resultSchema = new mongoose.Schema({
//   symbolNo: { type: String, required: true, unique: true },
//   studentName: { type: String, required: true },
//   examYear: { type: Number, required: true },
//   subjects: [
//     {
//       code: String,
//       title: String,
//       marksObtained: Number,
//       maxMarks: Number
//     }
//   ],
//   totalMarks: Number,
//   percentage: Number,
//   grade: String,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('Result', resultSchema);



// models/Result.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  symbolNo: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  examYear: { type: Number, required: true },
  subjects: [
    {
      code: String,
      title: String,
      marksObtained: Number,
      maxMarks: Number
    }
  ],
  totalMarks: Number,
  percentage: Number,
  grade: String,

  // 👇 New field added
  status: {
    type: String,
    enum: ['Pass', 'Fail'],
    required: true
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Result', resultSchema);
