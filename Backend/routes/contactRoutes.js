const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');
const nodemailer = require('nodemailer');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newMessage = new ContactMessage({ name, email, subject, message });
    await newMessage.save();

    // Optional: Send email to admin
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bohoraghanindra@gmail.com',
        pass: 'uqda jkwx gior mgxk', // ✅ Your app password
      },
    });

    await transporter.sendMail({
      from: email,
      to: 'bohoraghanindra@gmail.com', // 📥 Admin email
      subject: `New Contact Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
