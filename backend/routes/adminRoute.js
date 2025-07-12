const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin-only routes
router.get('/admin/users', adminController.getUsers);
router.get('/admin/banned-users', adminController.getBannedUsers);
router.post('/admin/ban/:id', adminController.banUser);
router.post('/admin/unban/:id', adminController.unbanUser);
router.post('/admin/remove-skills/:id', adminController.removeSkills);
router.post('/admin/broadcast', adminController.broadcastMessage);
router.get('/admin/reports/:type', adminController.downloadReport);

module.exports = router;
