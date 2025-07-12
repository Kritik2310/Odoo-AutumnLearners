const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authenticate = require('../middleware/auth');

// GET /api/user/me → get logged-in user's data
router.get('/me', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/user/update → update user profile
router.put('/update', authenticate, async (req, res) => {
  try {
    const updates = {
      name: req.body.name,
      location: req.body.location,
      skillsOffered: req.body.skillsOffered,
      skillsWanted: req.body.skillsWanted,
      availability: req.body.availability ? [req.body.availability] : [],
      isPublic: req.body.isPublic === 'Public',
      profilePhoto: req.body.profilePhoto,
    };

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ message: 'Update failed' });
  }
});

module.exports = router;
