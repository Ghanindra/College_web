

// routes/examFormRoutes.js
const express = require('express');
const router = express.Router();
const ExamForm = require("../models/ExamForm.js");
const FormConfig = require('../models/FormConfig');
const multer = require('multer');
const nodemailer = require('nodemailer');
const auth = require("../middleware/auth");
const path = require("path");
// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bohoraghanindra@gmail.com',
    pass: 'uqda jkwx gior mgxk',
  },
});

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });
// ============================================
// POST /api/forms/draft - Save draft (REQUIRES AUTH)
// ============================================
router.post(
  "/draft",
  auth(),
   // Auth middleware MUST be here
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "citizenshipDocument", maxCount: 1 },
    { name: "plusTwoDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      console.log(" Draft route hit");
      console.log("User from auth:", req.user);

      // Check if user is authenticated
      if (!req.user || !req.user.id) {
        return res.status(401).json({ 
          message: "Unauthorized - Please login first" 
        });
      }

      // Parse form data
      const data = JSON.parse(req.body.data);
      console.log("Parsed form data:", data);

      // Create draft
      // const draft = await ExamForm.create({
      //   ...data,
      //   studentId: req.user.id, // From auth middleware
      //   photo: req.files.photo?.[0]?.filename,
      //   citizenshipDocument: req.files.citizenshipDocument?.[0]?.filename,
      //   plusTwoDocument: req.files.plusTwoDocument?.[0]?.filename,
      //   paymentStatus: "pending",
      // });
// For draft
const draft = await ExamForm.create({
  ...data,
  studentId: req.user.id,
  photo: req.files.photo?.[0] ? `/uploads/${req.files.photo[0].filename}` : null,
  citizenshipDocument: req.files.citizenshipDocument?.[0] ? `/uploads/${req.files.citizenshipDocument[0].filename}` : null,
  plusTwoDocument: req.files.plusTwoDocument?.[0] ? `/uploads/${req.files.plusTwoDocument[0].filename}` : null,
  paymentStatus: "pending",
});

      console.log("✅ Draft created:", draft._id);

      res.json({ 
        success: true, 
        draftId: draft._id,
        message: "Draft saved successfully"
      });

    } catch (err) {
      console.error(" Draft error:", err);
      res.status(500).json({ 
        message: "Failed to save draft",
        error: err.message
      });
    }
  }
);

// ============================================
// POST /api/forms - Final form submission (after payment)
// ============================================
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'plusTwoDocument', maxCount: 1 },
    { name: 'citizenshipDocument', maxCount: 1 },
  ]),
  async (req, res) => {
    console.log('POST /api/forms route hit');
    try {
      const formData = JSON.parse(req.body.data);

      console.log('Received form data:', formData);
      console.log('Received files:', req.files);

      // Assign file names
      // formData.photo = req.files['photo']?.[0]?.filename || null;
      // formData.plusTwoDocument = req.files['plusTwoDocument']?.[0]?.filename || null;
      // formData.citizenshipDocument = req.files['citizenshipDocument']?.[0]?.filename || null;

      formData.photo = req.files.photo?.[0] ? `/uploads/${req.files.photo[0].filename}` : null;
formData.plusTwoDocument = req.files.plusTwoDocument?.[0] ? `/uploads/${req.files.plusTwoDocument[0].filename}` : null;
formData.citizenshipDocument = req.files.citizenshipDocument?.[0] ? `/uploads/${req.files.citizenshipDocument[0].filename}` : null;

      const savedForm = await new ExamForm(formData).save();
      
      console.log('✅ Form saved:', savedForm._id);
      
      res.status(201).json(savedForm);
    } catch (err) {
      console.error('❌ Error saving form:', err);
      res.status(500).json({ 
        message: 'Error saving form', 
        error: err.message 
      });
    }
  }
);

// ============================================
// GET /api/forms - Get all forms (Admin)
// ============================================
router.get('/', async (req, res) => {
  try {
    const forms = await ExamForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching forms' });
  }
});

// ============================================
// GET /api/forms/forms - Get forms with query
// ============================================
router.get('/forms', async (req, res) => {
  try {
    const { tuRegistrationNo } = req.query;
    let query = {};
    
    if (tuRegistrationNo) {
      query.tuRegistrationNo = tuRegistrationNo;
    }
    
    const forms = await ExamForm.find(query).sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ============================================
// GET /api/forms/:id - Get single form
// ============================================
// router.get('/forms/:id', async (req, res) => {
//   try {
//     const form = await ExamForm.findById(req.params.id);

//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }

//     res.json(form);
//   } catch (err) {
//     console.error('Error fetching form by id:', err);

//     if (err.name === 'CastError') {
//       return res.status(400).json({ message: 'Invalid form ID' });
//     }

//     res.status(500).json({ message: 'Server Error' });
//   }
// });



// ============================================
// GET /api/forms/student/my-form
// Get logged-in student's form
// ============================================
router.get("/student/my-form", auth(), async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const form = await ExamForm.findOne({
      studentId: req.user.id,
    }).sort({ createdAt: -1 });

    if (!form) {
      return res.json(null); // No form yet
    }

    res.json(form);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// ============================================
// PATCH /api/forms/:id/complete-payment - Complete payment
// ============================================
router.patch('/forms/:id/complete-payment', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    if (form.paymentStatus === 'completed') {
      return res.status(400).json({ 
        message: 'Payment already completed',
        currentStatus: form.paymentStatus 
      });
    }

    // Mark as completed
    form.paymentStatus = 'completed';
    
    if (form.paymentDetails) {
      form.paymentDetails.completedAt = new Date();
      form.paymentDetails.status = 'completed';
    }

    await form.save();

    // Send confirmation email
    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Payment Successful - Tribhuvan University',
      text: `Dear ${form.fullName},\n\nYour exam form has been submitted successfully and your payment has been confirmed.\n\nForm ID: ${form._id}\nPayment Status: Completed\n\nBest regards,\nTribhuvan University`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
      } else {
        console.log('Confirmation email sent:', info.response);
      }
    });

    res.json({ 
      message: 'Payment completed successfully', 
      form 
    });

  } catch (err) {
    console.error('Error completing payment:', err);
    res.status(500).json({ 
      message: 'Error completing payment', 
      error: err.message 
    });
  }
});

// ============================================
// PATCH /api/forms/:id/approve - Approve payment (Admin)
// ============================================
// router.patch('/forms/:id/approve', async (req, res) => {
//   try {
//     const form = await ExamForm.findById(req.params.id);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }

//     form.paymentStatus = 'completed';
//     await form.save();

//     console.log('Sending email to:', form.contact.email);

//     const mailOptions = {
//       from: 'bohoraghanindra@gmail.com',
//       to: form.contact.email,
//       subject: 'Exam Form Payment Approved - Tribhuvan University',
//       text: `Dear ${form.fullName},\n\nYour exam form payment has been approved successfully.\n\nBest regards,\nTribhuvan University`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email error:', error);
//         return res.status(500).json({ 
//           message: 'Form approved, but failed to send email', 
//           error: error.message 
//         });
//       } else {
//         console.log('Email sent:', info.response);
//         return res.json({ 
//           message: 'Payment approved and email sent', 
//           form 
//         });
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// ============================================
// PATCH /api/forms/:id/reject - Reject payment (Admin)
// ============================================
// router.patch('/forms/:id/reject', async (req, res) => {
//   try {
//     const form = await ExamForm.findById(req.params.id);
//     if (!form) {
//       return res.status(404).json({ message: 'Form not found' });
//     }

//     form.paymentStatus = 'rejected';
//     await form.save();

//     console.log('Sending rejection email to:', form.contact.email);

//     const mailOptions = {
//       from: 'bohoraghanindra@gmail.com',
//       to: form.contact.email,
//       subject: 'Exam Form Payment Rejected - Tribhuvan University',
//       text: `Dear ${form.fullName},\n\nUnfortunately, your exam form payment has been rejected. Please check your form and submit again.\n\nBest regards,\nTribhuvan University`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.error('Email error:', error);
//         return res.status(500).json({ 
//           message: 'Form rejected, but failed to send email', 
//           error: error.message 
//         });
//       } else {
//         console.log('Rejection email sent:', info.response);
//         return res.json({ 
//           message: 'Form rejected and email sent', 
//           form 
//         });
//       }
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });



// Reject form
router.patch('/forms/:id/reject', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.approvalStatus = 'rejected'; // <-- only approvalStatus
    await form.save();

    console.log('Sending rejection email to:', form.contact?.email);
    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Rejected - TU',
      text: `Dear ${form.fullName},\n\nYour exam form has been rejected. Please edit and resubmit.\n\nBest regards,\nTU`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ message: 'Rejected but email failed', error: error.message });
      res.json({ message: 'Form rejected and email sent', form });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Approve form
router.patch('/forms/:id/approve', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.approvalStatus = 'approved';
    form.paymentStatus = 'completed';
    await form.save();

    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Approved - TU',
      text: `Dear ${form.fullName},\n\nYour exam form has been approved.\n\nBest regards,\nTU`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) return res.status(500).json({ message: 'Approved but email failed', error: error.message });
      res.json({ message: 'Form approved and email sent', form });
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});







// ============================================
// POST /api/forms/:id/send-email - Send email
// ============================================
router.post('/forms/:id/send-email', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Approved - Tribhuvan University',
      text: `Dear ${form.fullName},\n\nYour form has been approved.\n\nRegards,\nTU`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
        return res.status(500).json({ 
          message: 'Email failed', 
          error: error.message 
        });
      } else {
        console.log('Email sent:', info.response);
        res.json({ message: 'Email sent successfully' });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ============================================
// PUT /api/forms/:id - Update form (requires auth)
// ============================================
// router.put("/forms/:id", auth, async (req, res) => {
//   try {
//     const form = await ExamForm.findById(req.params.id);

//     if (!form) {
//       return res.status(404).json({ message: "Form not found" });
//     }
// if (form.approvalStatus === "approved") {
//   return res.status(403).json({ message: "Form locked after approval" });
// }
//     if (form.paymentStatus === "completed") {
//       return res.status(403).json({ message: "Form locked after payment" });
//     }

//     if (form.studentId.toString() !== req.user.userId.toString()) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     Object.assign(form, req.body);
//     await form.save();

//     res.json(form);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });


router.put(
  "/forms/:id",
  auth(),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "citizenshipDocument", maxCount: 1 },
    { name: "plusTwoDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const form = await ExamForm.findById(req.params.id);
      if (!form) return res.status(404).json({ message: "Form not found" });

      // Only allow edit if rejected or pending
      if (form.approvalStatus === "approved") {
        return res.status(403).json({ message: "Form locked after approval" });
      }

      if (form.studentId.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const data = req.body.data ? JSON.parse(req.body.data) : {};

      // Update only if field exists
      if (data.fullName) form.fullName = data.fullName;
      if (data.nationality) form.nationality = data.nationality;
      if (data.semester) form.semester = data.semester;
      if (data.year) form.year = data.year;
      if (data.batch) form.batch = data.batch;
      if (data.collegeName) form.collegeName = data.collegeName;
      if (data.course) form.course = data.course;
      if (data.examCenter) form.examCenter = data.examCenter;
      if (data.subjects) form.subjects = data.subjects;
      if (data.academicRecords) form.academicRecords = data.academicRecords;
      if (data.address) form.address = { ...form.address, ...data.address };
      if (data.contact) form.contact = { ...form.contact, ...data.contact };
      if (data.paymentDetails) form.paymentDetails = { ...form.paymentDetails, ...data.paymentDetails };

      // Handle optional file uploads
      if (req.files?.photo) form.photo = `/uploads/${req.files.photo[0].filename}`;
      if (req.files?.citizenshipDocument) form.citizenshipDocument = `/uploads/${req.files.citizenshipDocument[0].filename}`;
      if (req.files?.plusTwoDocument) form.plusTwoDocument = `/uploads/${req.files.plusTwoDocument[0].filename}`;

      // Reset approvalStatus only if the form was previously rejected
      if (form.approvalStatus === "rejected") form.approvalStatus = "pending";

      await form.save();
      res.json({ message: "Form updated successfully", form });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server Error", error: err.message });
    }
  }
);





// ============================================
// Form Config Routes
// ============================================

// POST /api/forms/form-config - Set form config
router.post("/form-config", async (req, res) => {
  try {
    const { formType, startTime, endTime } = req.body;
    
    await FormConfig.findOneAndUpdate(
      { formType },
      { startTime, endTime },
      { upsert: true }
    );
    
    res.send({ message: "Config saved." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving config' });
  }
});

// GET /api/forms/form-config?formType=examForm - Get form config
router.get("/form-config", async (req, res) => {
  try {
    const config = await FormConfig.findOne({ formType: req.query.formType });
    
    if (!config) {
      return res.status(404).json({ message: "Config not found" });
    }
    
    res.json(config);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching config' });
  }
});

module.exports = router;


