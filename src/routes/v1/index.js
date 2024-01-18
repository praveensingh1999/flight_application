const express = require('express');

const { InfoController } = require('../../controllers');
const airplaneRouters = require('./airplane-route');
const cityRoutes=require('./city-route');
const router = express.Router();
router.use('/airplanes', airplaneRouters);
router.use('/cities', cityRoutes);
router.get('/info', InfoController.info);

module.exports = router;