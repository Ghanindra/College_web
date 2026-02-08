const express = require('express');
const router = express.Router();
const ExamForm = require('../models/ExamForm');
const FormConfig = require('../models/FormConfig');
const multer = require('multer');
const nodemailer = require('nodemailer');

// Replace with your email credentials
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bohoraghanindra@gmail.com', // Your Gmail
    pass: 'xdixmbhdqwseawhp',       // App Password (not Gmail login)
  },
});
// Photo upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
// const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });



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

      // Assign file names to the correct fields
      formData.photo = req.files['photo']?.[0]?.filename || null;
      formData.plusTwoDocument = req.files['plusTwoDocument']?.[0]?.filename || null;
      formData.citizenshipDocument = req.files['citizenshipDocument']?.[0]?.filename || null;

      const savedForm = await new ExamForm(formData).save();
      res.status(201).json(savedForm);
    } catch (err) {
      console.error('Error saving form:', err);
      res.status(500).json({ message: 'Error saving form', error: err.message });
    }
  }
);

// examFormRoutes.js
router.post(
  "/draft",
  
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "plusTwoDocument", maxCount: 1 },
    { name: "citizenshipDocument", maxCount: 1 },
  ]),
  async (req, res) => {
    console.log("hit /draft");           // sanity check
    console.log("files", req.files);     // see if multer parsed
    console.log("body", req.body);       // see if JSON.parse fails
    try {
      const parsed = JSON.parse(req.body.data || "{}");

      // build the record the same way you do in the normal POST /
      const draft = await ExamForm.create({
        ...parsed,
        photo: req.files["photo"]?.[0]?.filename || null,
        plusTwoDocument: req.files["plusTwoDocument"]?.[0]?.filename || null,
        citizenshipDocument: req.files["citizenshipDocument"]?.[0]?.filename || null,
        status: "payment-pending",
      });
      res.json({ draftId: draft._id, productId: draft._id });
    } catch (e) {
      console.error("draft error", e);
      res.status(500).json({ message: e.message });
    }
  }
);
// GET all forms for admin
router.get('/', async (req, res) => {
  try {
    const forms = await ExamForm.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching forms' });
  }
});

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



router.patch('/forms/:id/approve', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.paymentStatus = 'completed';
    await form.save();

    console.log('Sending email to:', form.contact.email);

    // Send email
    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Payment Approved - Tribhuvan University',
      text: `Dear ${form.fullName},\n\nYour exam form payment has been approved successfully.\n\nBest regards,\nTribhuvan University`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
        return res.status(500).json({ message: 'Form approved, but failed to send email', error: error.message });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ message: 'Payment approved and email sent', form });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

router.patch('/forms/:id/reject', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.paymentStatus = 'rejected';
    await form.save();

    console.log('Sending rejection email to:', form.contact.email);

    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Payment Rejected - Tribhuvan University',
      text: `Dear ${form.fullName},\n\nUnfortunately, your exam form payment has been rejected. Please check your form and submit again.\n\nBest regards,\nTribhuvan University`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
        return res.status(500).json({ message: 'Form rejected, but failed to send email', error: error.message });
      } else {
        console.log('Rejection email sent:', info.response);
        return res.json({ message: 'Form rejected and email sent', form });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


router.post('/forms/:id/send-email', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    const mailOptions = {
      from: 'bohoraghanindra@gmail.com',
      to: form.contact.email,
      subject: 'Exam Form Approved - Tribhuvan University',
      text: `Dear ${form.fullName},\n\nYour form has been approved.\n\nRegards,\nTU`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Email error:', error);
        return res.status(500).json({ message: 'Email failed', error: error.message });
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

// POST /api/form-config
router.post("/form-config", async (req, res) => {
  const { formType, startTime, endTime } = req.body;
  await FormConfig.findOneAndUpdate(
    { formType },
    { startTime, endTime },
    { upsert: true }
  );
  res.send({ message: "Config saved." });
});

// GET /api/form-config?formType=examForm
router.get("/form-config", async (req, res) => {
  const config = await FormConfig.findOne({ formType: req.query.formType });
  if (!config) return res.status(404).json({ message: "Config not found" });
  res.json(config);
});
// GET single exam form by ID
router.get('/forms/:id', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);

    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.json(form);
  } catch (err) {
    console.error('Error fetching form by id:', err);

    // handle invalid ObjectId
    if (err.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid form ID' });
    }

    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;
