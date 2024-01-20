const { StatusCodes } = require('http-status-codes');
const { AirportService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
/**
 * POST : /airports 
 * req-body { parameters name,code,address,cityid}
 */
async function createAirport(req, res) {
    try {
        
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId

        });
        SuccessResponse.data = airport;
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
 * POST : /airports
 * req-body {}
 */
async function getAirports(req, res) {
    try {
        const airports = await AirportService.getAirports();
        SuccessResponse.data = airports;
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
 * POST : /airports/:id 
 * req-body {}
 */
async function getAirport(req, res) {
    try {
        const airport = await AirportService.getAirport(req.params.id);
        SuccessResponse.data = airport;
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
 * DELETE : /airports/:id
 * req-body {}
 */
async function destroyAirport(req, res) {
    try {
        const airport = await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data = airport;
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
 * update : /airplanes/:id
 * req-body {}
 */
async function updateAirport(req,res)
{
    try{ 
        // console.log(req.body.capacity,req.params.id, "suraj1");
        // console.log(req, "error occure");
        //console.log("stared gtts");

         const airport = await AirportService.updateAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId: req.body.cityId                             //query

            
         },req.params.id);
         SuccessResponse.data = airport;

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
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}