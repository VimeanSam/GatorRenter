const express = require('express');
const router = express.Router();
const messageControl = require('../controllers/messageController');

router.post('/text', messageControl.text);
router.post('/reply', messageControl.reply);
router.post('/getMessages', messageControl.getMessageTopics);
router.post('/getAllMessages', messageControl.getAllmessages);

module.exports = router;