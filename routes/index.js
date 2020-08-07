const express = require('express');
const router = express.Router();
const view = require('../controllers/viewController');
const listings = require('../controllers/listingsController');
const messages = require('../controllers/messageController');

router.get('/', view.welcome);
router.get('/districts', view.district);
router.get('/districtsInfo', view.returnDistrictInfo);
router.get('/login', view.login);
router.get('/signup', view.signup);
router.get('/postListings', view.postlistings);
router.get('/mylistings', listings.mylistings);
router.get('/dashboard', listings.getPending);
router.get('/dashboard/:id', listings.viewPending);
router.get('/homedetails/:id', listings.viewApprovedListings);
router.get('/messages', messages.getMessageTopics);
router.get('/messages/:id', messages.getAllmessages);

//about
router.get('/about/apurva', view.apurvaEndpoint);
router.get('/about/chaitali', view.chaitaliEndpoint);
router.get('/about/christian', view.christianEndpoint);
router.get('/about/leon', view.leonEndpoint);
router.get('/about/patrick', view.patrickEndpoint);
router.get('/about/vimean', view.vimeanEndpoint);
router.get('/about/emily', view.emilyEndpoint);

module.exports = router;