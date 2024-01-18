const express = require('express');
const { cityController} = require('../../controllers');
const {CityMiddlewares}= require('../../middlewares')
const router = express.Router();


// /api/v1/cities POST
router.post('/', 
       CityMiddlewares.validateCreateRequest,
        cityController.createCity);

// /api/v1/cities/:id DELETE
router.delete('/:id', 
        cityController.destroyCity);

/**
 /api/v1/cities - PATCH
 Req Body: {name: "varanasi"}
 */
        router.patch('/:id',
        cityController.updateCity);        

module.exports = router;