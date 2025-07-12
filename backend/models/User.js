const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  gender: { type: String, enum: ["Male","Feamle","Other"]},
  age: { type: Number, min:0},
  skillsOffered: [String],
  skillsWanted: [String],
  availability: [String],
  isPublic: { type: Boolean, default: true },
  profilePhoto: String,
  location: String
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);