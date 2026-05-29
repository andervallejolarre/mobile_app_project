const express = require('express'),
    router = express.Router(),
    controller = require('../controllers/discogsController.js');

//Client routes
router.get('/labelSearch', controller.labelSearch);
router.get('/newReleases', controller.newReleases);


module.exports = router;