const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Middleware to simulate logged-in user (replace with real auth in prod)
const mockUserId = "666111abcde123456789"; // Replace with actual ObjectId

router.get("/recommendations", async (req, res) => {
  const currentUser = await User.findById(mockUserId);
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

module.exports = router;
