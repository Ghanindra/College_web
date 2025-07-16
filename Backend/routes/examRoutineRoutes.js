// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const ExamRoutine = require('../models/Routine');

// const uploadDir = path.join(__dirname, '../uploads');
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer config
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadDir),
//   filename: (req, file, cb) => cb(null, 'exam-routine' + path.extname(file.originalname)),
// });
// const upload = multer({ storage });

// // Helper to get routine file path
// function getRoutineFilePath() {
//   const files = fs.readdirSync(uploadDir);
//   const file = files.find(f => f.startsWith('exam-routine'));
//   return file ? path.join(uploadDir, file) : null;
// }

// // POST - Upload (or replace) exam routine
// router.post('/upload', upload.single('examRoutine'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

//     const imagePath = '/uploads/' + req.file.filename;

//     // Remove old DB entry
//     await ExamRoutine.deleteMany();

//     // Save new to DB
//     const newRoutine = new ExamRoutine({ imageUrl: imagePath });
//     await newRoutine.save();

//     res.json({ message: 'Exam routine uploaded successfully', routine: newRoutine });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to upload routine' });
//   }
// });

// // GET - Serve exam routine image metadata
// router.get('/', async (req, res) => {
//   try {
//     const routine = await ExamRoutine.findOne().sort({ createdAt: -1 });
//     if (!routine) return res.status(404).json({ error: 'Exam routine not found' });

//     const absolutePath = path.join(__dirname, '..', routine.imageUrl);
//     if (!fs.existsSync(absolutePath)) {
//       return res.status(404).json({ error: 'File not found in server' });
//     }

//     res.sendFile(absolutePath);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch routine' });
//   }
// });

// // DELETE - Delete exam routine
// router.delete('/', async (req, res) => {
//   try {
//     const routine = await ExamRoutine.findOne();
//     if (!routine) return res.status(404).json({ error: 'No routine in database' });

//     const absolutePath = path.join(__dirname, '..', routine.imageUrl);
//     if (fs.existsSync(absolutePath)) {
//       fs.unlinkSync(absolutePath);
//     }

//     await ExamRoutine.deleteMany();
//     res.json({ message: 'Routine deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete routine' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ExamRoutine = require('../models/Routine'); // your mongoose model

const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    // save with timestamp + original name to avoid conflicts
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// POST - Upload exam routine image and save path in DB
router.post('/upload', upload.single('examRoutine'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    // Build relative image URL (adjust if your static folder differs)
    const imageUrl = '/uploads/' + req.file.filename;

    // Optional: remove old routine documents and files (if only one is allowed)
    const oldRoutines = await ExamRoutine.find();
    for (const routine of oldRoutines) {
      // Remove file from disk
      const oldPath = path.join(__dirname, '..', routine.imageUrl);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    await ExamRoutine.deleteMany();

    // Save new routine document
    const newRoutine = new ExamRoutine({ imageUrl });
    await newRoutine.save();

    res.json({ message: 'Exam routine uploaded successfully', routine: newRoutine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to upload routine' });
  }
});

// GET - Serve latest routine image metadata
router.get('/', async (req, res) => {
  try {
    const routine = await ExamRoutine.findOne().sort({ createdAt: -1 });
    if (!routine) return res.status(404).json({ error: 'No exam routine found' });

    res.json({ routine });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch routine' });
  }
});

module.exports = router;
