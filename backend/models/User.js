// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: Number,
  gender: String,
  location: String,
  profilePhoto: String,
  availability: String,
  banned: { type: Boolean, default: false },
  visibility: { type: String, default: "Public" },
  offeredSkills: [String],
  wantedSkills: [String],
  isProfileComplete: { type: Boolean, default: false},
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);