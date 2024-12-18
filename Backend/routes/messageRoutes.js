const express = require('express');
const authController = require('../controllers/authController');
const messageController = require('../controllers/messageController');

// '/' is /api/v1/messages

const router = express.Router();

// PROTECT ALL ROUTES UNDER THIS
router.use(authController.protect);

router.get('/users', messageController.getUsersForSideBar);
router.get('/:receiverId', messageController.getMessages);

router.post('/send/:receiverId', messageController.sendMessage);

module.exports = router;
