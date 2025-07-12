const express = require('express');
const router = express.Router();
const swapController = require('../controllers/swapController');

router.post('/request', swapController.createSwapRequest);
router.get('/requests/:userId', swapController.getReceivedRequests);
router.patch('/request/:id/status', swapController.updateStatus);
router.get('/swaps', swapController.getAllSwaps); // admin view

module.exports = router;
