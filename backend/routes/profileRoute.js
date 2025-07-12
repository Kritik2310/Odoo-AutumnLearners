const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update profile
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get all users (for home.html)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Check if user profile exists
router.get("/:id/check", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ profileExists: false });
    }

    // You can customize this check to suit your profile requirements
    const profileExists = user.gender && user.age; // Add other fields if needed

    res.json({ profileExists: !!profileExists });
  } catch (err) {
    console.error("Error checking profile:", err);
    res.status(500).json({ profileExists: false });
  }
});
module.exports = router;
