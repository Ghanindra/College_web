const express = require('express');
const router = express.Router();
const ExamForm = require('../models/ExamForm');
const multer = require('multer');

// Photo upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/', upload.single('photo'), async (req, res) => {
  console.log('POST /api/forms route hit');
  try {
    const formData = JSON.parse(req.body.data);
    console.log('Received form data:', formData);
    console.log('Received file:', req.file);
    formData.photo = req.file.filename;
    const savedForm = await new ExamForm(formData).save();
    res.status(201).json(savedForm);
  } catch (err) {
    console.error('Error saving form:', err);
    res.status(500).json({ message: 'Error saving form', error: err.message });
  }
});


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

// Approve a form (update paymentStatus to 'completed')
router.patch('/forms/:id/approve', async (req, res) => {
  try {
    const form = await ExamForm.findById(req.params.id);
    if (!form) return res.status(404).json({ message: 'Form not found' });

    form.paymentStatus = 'completed';
    await form.save();

    res.json({ message: 'Payment approved', form });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});



module.exports = router;
