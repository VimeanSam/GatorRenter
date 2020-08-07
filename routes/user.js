const express = require('express');
const router = express.Router();
const authControl = require('../controllers/authController');

router.post('/signup', authControl.signup);
router.post('/login', authControl.login);
router.post('/logout', authControl.logout);
    
module.exports = router;