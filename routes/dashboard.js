const express = require('express');
const router = express.Router();
const listingControl = require('../controllers/listingsController');

router.get('/dashboards', listingControl.getPending);
router.post('/profile', listingControl.viewPending);
router.post('/approve', listingControl.approvePost);
router.post('/reject', listingControl.rejectPost);

module.exports = router;