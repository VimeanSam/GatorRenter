const express = require('express');
const router = express.Router();
const listingControl = require('../controllers/listingsController');

router.post('/filtering', listingControl.filterPost);

module.exports = router;