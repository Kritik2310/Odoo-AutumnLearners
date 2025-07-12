const express = require('express');
const router = express.Router();
const {
  getUsers,
  getBannedUsers,
  banUser,
  unbanUser
} = require('../controllers/adminController');

router.get('/users', getUsers);
router.get('/banned-users', getBannedUsers);
router.post('/ban/:id', banUser);
router.post('/unban/:id', unbanUser);

module.exports = router;
