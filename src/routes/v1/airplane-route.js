const express = require('express');

const {AirplaneController} = require('../../controllers');
const router = express.Router();

// /api/v1/airplanes POST
router.post('/', AirplaneController.createAirplane);

module.exports = router;