// routes/result.js
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Admin posts new result
// router.post('/add', async (req, res) => {
//   try {
//     const data = req.body;

//     // Add status based on percentage
//     const percentage = data.percentage;
//     const status = percentage >= 40 ? 'Pass' : 'Fail';

//     const result = new Result({
//       ...data,
//       status, // ✅ Automatically add pass/fail
//     });

//     await result.save();
//     res.status(201).json({ message: 'Result added successfully', result });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });


// Admin adds a new result
router.post('/add', async (req, res) => {
  try {
    const data = req.body;

    // Check each subject's marks
    const hasFailedSubject = data.subjects.some(sub => Number(sub.marksObtained) < 40);
    const status = hasFailedSubject ? 'Fail' : 'Pass';

    const result = new Result({
      ...data,
      status // ✅ add pass/fail based on subject marks
    });

    await result.save();
    res.status(201).json({ message: 'Result added successfully', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// User searches result by symbol number
router.get('/search', async (req, res) => {
  try {
    const { symbolNo } = req.query;
    if (!symbolNo) return res.status(400).json({ error: 'Symbol number is required' });

    const result = await Result.findOne({ symbolNo });
    if (!result) return res.status(404).json({ error: 'Result not found' });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
