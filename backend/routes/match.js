const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authenticate = require("../middleware/auth");

// Recommendations: Top 5 matches
router.get("/recommendations", authenticate, async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser) return res.status(404).json({ msg: "User not found" });

  const allUsers = await User.find({ _id: { $ne: currentUser._id } });

  const matches = allUsers.map((user) => {
    const offerMatch = user.skillsWanted.filter(skill =>
      currentUser.skillsOffered.includes(skill)
    ).length;

    const wantMatch = user.skillsOffered.filter(skill =>
      currentUser.skillsWanted.includes(skill)
    ).length;

    const matchScore = offerMatch + wantMatch;
    const ratingBonus = (user.rating || 0) * 0.1;

    return {
      user: {
        id: user._id,
        name: user.name,
        skillsOffered: user.skillsOffered,
        skillsWanted: user.skillsWanted,
        rating: user.rating,
        profilePhoto: user.profilePhoto,
        location: user.location
      },
      matchScore,
      combinedScore: matchScore + ratingBonus,
    };
  });

  const filtered = matches
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.combinedScore - a.combinedScore)
    .slice(0, 5);

  res.json(filtered);
});

// Find one best match (used on match page)
router.get("/find", authenticate, async (req, res) => {
  const currentUser = await User.findById(req.user.id);
  if (!currentUser) return res.status(404).json({ message: "User not found" });

  const allUsers = await User.find({ _id: { $ne: currentUser._id } });

  const matches = allUsers.map((user) => {
    const offerMatch = user.skillsWanted.filter(skill =>
      currentUser.skillsOffered.includes(skill)
    ).length;

    const wantMatch = user.skillsOffered.filter(skill =>
      currentUser.skillsWanted.includes(skill)
    ).length;

    const matchScore = offerMatch + wantMatch;
    const ratingBonus = (user.rating || 0) * 0.1;

    return {
      user,
      matchScore,
      combinedScore: matchScore + ratingBonus,
    };
  });

  const bestMatch = matches
    .filter(m => m.matchScore > 0)
    .sort((a, b) => b.combinedScore - a.combinedScore)[0];

  if (!bestMatch) return res.status(404).json({ message: "No match found" });

  res.json(bestMatch.user);
});

module.exports = router;
