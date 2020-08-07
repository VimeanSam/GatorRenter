const express = require('express');
const router = express.Router();
const districtControl = require('../controllers/districtController');

router.get('/all', districtControl.getAll);
router.get('/getDistrict', districtControl.getDistrictbyName);

module.exports = router;