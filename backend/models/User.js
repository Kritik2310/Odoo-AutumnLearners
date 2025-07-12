// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,

  // Profile fields
  location: String,
  offeredSkills: [String],
  wantedSkills: [String],
  availability: String,
  visibility: { type: String, default: "Public" },
  profilePhoto: String
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);
