const User = require('../models/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching users' });
  }
};

exports.getBannedUsers = async (req, res) => {
  try {
    const users = await User.find({ banned: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching banned users' });
  }
};

exports.banUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { banned: true });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to ban user' });
  }
};

exports.unbanUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { banned: false });
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: 'Failed to unban user' });
  }
};
