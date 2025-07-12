const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  offeredSkills: [String],
  wantedSkills: [String],
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("SwapRequest", swapRequestSchema);
