const { StatusCodes } = require('http-status-codes');
const { CityService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
/**
 * POST : /cities 
 * req-body {name: 'varanasi'}
 */
async function createCity(req, res) {
    try {
        // console.log("controller create city");
        const city = await CityService.createCity({
            name: req.body.name
            
        });
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statuscode)
                .json(ErrorResponse);
    }
}


/**
 * DELETE : /city/:id
 * req-body {}
 */
async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statuscode)
                .json(ErrorResponse);
    }
}


/**
 * update : /cities/:id
 * req-body {}
 */
async function updateCity(req,res)
{
    try{ 
        // console.log(req.body.name,req.params.id, "suraj1");
        // console.log(req, "error occure");
        //console.log("update city");

         const city = await CityService.updateCity({
            name : req.body.name   //query is used to take data in parem and body is used to take data in body 

            
         },req.params.id);
         SuccessResponse.data = city;

         return res
                   .status(StatusCodes.ACCEPTED)
                  .json( SuccessResponse );

    }catch(error) 
    {
        ErrorResponse.error = error 
        return res
                  .status(error.statuscode) //Error has Self Property statusCode we simply not write again we just
                                            //Pass it with statusCode
                  .json(ErrorResponse);
    }
}


module.exports = {
createCity,
destroyCity,
updateCity
}