const SwapRequest = require('../models/SwapRequest');
const User = require('../models/User');

// Create a new swap request
exports.createSwapRequest = async (req, res) => {
  const { fromUserId, toUserId } = req.body;

  try {
    const fromUser = await User.findById(fromUserId);
    const toUser = await User.findById(toUserId);

    if (!fromUser || !toUser) return res.status(404).json({ message: 'User not found' });

    const request = new SwapRequest({
      fromUser: fromUser._id,
      toUser: toUser._id,
      offeredSkills: fromUser.offeredSkills,
      wantedSkills: fromUser.wantedSkills,
    });

    await request.save();
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create swap request' });
  }
};

// Get all requests made to a specific user
exports.getReceivedRequests = async (req, res) => {
  try {
    const requests = await SwapRequest.find({ toUser: req.params.userId })
      .populate('fromUser', 'name location profilePhoto offeredSkills wantedSkills')
      .sort({ timestamp: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// Accept or reject a request
exports.updateStatus = async (req, res) => {
  try {
    const request = await SwapRequest.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(request);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

// Admin view: all requests
exports.getAllSwaps = async (req, res) => {
  try {
    const swaps = await SwapRequest.find()
      .populate('fromUser', 'name location profilePhoto')
      .populate('toUser', 'name location profilePhoto')
      .sort({ timestamp: -1 });

    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load swaps' });
  }
};
