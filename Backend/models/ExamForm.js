


// models/ExamForm.js
const mongoose=require( "mongoose");

const examFormSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Students", required: true },

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
  course: String,
  examCenter: String,

  subjects: [{ code: String, title: String }],

  paymentDetails: {
    amount: Number,
    method: String,
  },

  plusTwoDocument: String,
  citizenshipDocument: String,
  photo: String,


approvalStatus: {
  type: String,
  enum: ["pending", "approved", "rejected"],
  default: "pending",
},


  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "rejected"],
    default: "pending",
  },
}, { timestamps: true });
module.exports = mongoose.model('ExamForm', examFormSchema);
