const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRouters = require('./airplane-route');

const router = express.Router();
router.use('/airplanes', airplaneRouters);

router.get('/info', InfoController.info);

module.exports = router;