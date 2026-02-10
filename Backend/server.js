const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
require("dotenv").config();
// const esewaRoutes=require("./routes/paymentRoutes.js" )
const auth = require("./middleware/auth");
const app = express();
const examFormRoutes = require('./routes/examFormRoutes');
const resultRoutes = require('./routes/resultRoutes');
const examRoutineRoutes = require('./routes/examRoutineRoutes');
const contactRoutes = require('./routes/contactRoutes');

const { initiateEsewaPayment, esewaSuccess }=require( "./controllers/esewaController.js");



const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
  allowedHeaders: ["Authorization", "Content-Type", "Accept", "X-Requested-With"],
  credentials: true,
};

app.use(cors(corsOptions)); // Handles all routes, including OPTIONS preflight

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/events",require("./routes/eventRoutes"));
// app.use("/api/courses", require("./routes/courseRoutes"));
// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/faculties", require("./routes/facultyRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use('/api/forms', examFormRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/routine', examRoutineRoutes);
app.use('/api/contact', contactRoutes);
// server.js
app.use("/api/stats", require("./routes/dashboardStatsRoutes"));
app.use("/api/student", require("./routes/studentAuth"));
app.use("/api/student", require("./routes/studentDashboard")); // protected route example
// app.use("/api/payment", esewaRoutes);
// Function to create default admin
async function createDefaultAdmin() {
  try {
    const existing = await Admin.findOne({ email: "admin@gmail.com" });
    if (!existing) {
      const hashed = await bcrypt.hash("Admin@123", 10);
      const admin = new Admin({ email: "admin@gmail.com", password: hashed });
      await admin.save();
      console.log(" Default admin created: admin@gmail.com / Admin@123");
    } else {
      console.log("ℹ Default admin already exists.");
    }
  } catch (err) {
    console.error(" Error creating default admin:", err);
  }
}
app.post("/esewa/initiate",auth(), initiateEsewaPayment);
app.get("/esewa/success",esewaSuccess);

// app.post("/payment-status", verifyEsewaPayment);
// app.get("/complete-esewa", completeEsewaPayment);
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log(" MongoDB connected");
  await createDefaultAdmin();
  app.listen(5000, () => console.log(" Server running on port 5000"));
});
