const express = require('express');
const router = express.Router();
const multer = require('multer');
const listingControl = require('../controllers/listingsController');

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null , Date.now().toString()+"-"+file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      //reject file
      cb({message: 'Unsupported file format'}, false);
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.post('/upload', upload.array('file'), listingControl.postListing);
router.post('/deletePost', listingControl.deletePost);
router.post('/editPost', listingControl.updateListing);
router.post('/getbyID', listingControl.getByID);
module.exports = router;