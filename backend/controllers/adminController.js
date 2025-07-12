const User = require('../models/User');

// Get all non-banned users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ banned: false });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

// Get banned users
exports.getBannedUsers = async (req, res) => {
  try {
    const users = await User.find({ banned: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch banned users' });
  }
};

// Ban a user
exports.banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { banned: true });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
};

// Unban a user
exports.unbanUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { banned: false });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to unban user' });
  }
};

// Remove all skills from a user
exports.removeSkills = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { skills: [] });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove skills' });
  }
};

// Log a broadcast message
exports.broadcastMessage = (req, res) => {
  try {
    console.log('Broadcast message:', req.body.message);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to broadcast message' });
  }
};

// Placeholder report endpoint
exports.downloadReport = (req, res) => {
  const { type } = req.params;
  res.json({ message: `Report download for: ${type}` });
};
