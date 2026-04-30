const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: String,
  password: String, // hashed
  role:String
});

module.exports = mongoose.model("Admin", adminSchema);
