const mongoose = require('mongoose');

const examFormSchema = new mongoose.Schema({
  fullName: String,
  nationality: String,
  dob: Date,
  fatherName: String,
  address: {
    province: String,
    district: String,
    municipality: String,
    ward: String,
  },
  contact: {
    phone: String,
    email: String,
  },
  academicRecords: [
    {
      exam: String,
      board: String,
      year: String,
      rollNo: String,
      marks: String,
      percentage: String,
      division: String,
    },
  ],
  tuRegistrationNo: String,
  semester: String,
  year: String,
  batch: String,
  collegeName: String,
  examCenter: String,
  subjects: [
    {
      code: String,
      title: String,
    },
  ],
  paymentDetails: {
  amount: String,
  method: String,
 
},
  photo: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

module.exports = mongoose.model('ExamForm', examFormSchema);
