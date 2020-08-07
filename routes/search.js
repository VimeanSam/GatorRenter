const express = require('express');
const router = express.Router();
const listingControl = require('../controllers/listingsController');

router.post('/searchResults', listingControl.searchListings);
router.post('/viewProfile', listingControl.viewApprovedListings);

module.exports = router;