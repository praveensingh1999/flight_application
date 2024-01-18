const express = require('express');
const { cityController} = require('../../controllers');
const { AirplaneMiddlewares } = require('../../middlewares');
const router = express.Router();


// /api/v1/city POST
router.post('/', 
       
        cityController.createCity);



module.exports = router;