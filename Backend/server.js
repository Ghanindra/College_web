const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Admin = require("./models/Admin");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const auth = require("./middleware/auth");
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
// Serve uploaded files
app.use("/uploads", express.static("uploads"));
// Add gallery route
app.use("/api/gallery", require("./routes/galleryRoutes"));
app.use("/api/faculties", require("./routes/facultyRoutes"));

// Function to create default admin
async function createDefaultAdmin() {
  try {
    const existing = await Admin.findOne({ email: "admin@gmail.com" });
    if (!existing) {
      const hashed = await bcrypt.hash("Admin@123", 10);
      const admin = new Admin({ email: "admin@gmail.com", password: hashed });
      await admin.save();
      console.log("✅ Default admin created: admin@gmail.com / Admin@123");
    } else {
      console.log("ℹ️ Default admin already exists.");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err);
  }
}

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("✅ MongoDB connected");
  await createDefaultAdmin();
  app.listen(5000, () => console.log("🚀 Server running on port 5000"));
});
