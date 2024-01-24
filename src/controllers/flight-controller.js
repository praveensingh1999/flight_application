const { StatusCodes } = require('http-status-codes');
const { FlightService } = require('../services');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
/**
 * POST : /flights 
 * req-body {parameter}
 */
async function createflight(req, res) {
    try {
        // console.log("controller create city");
        const flight = await FlightService.createflight({
            flightNumber: req.body.flightNumber,
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime: req.body.departureTime,
            price: req.body.price,
            boardingGates: req.body.boardingGates,
            totalSeats: req.body.totalSeats
            
        });
        SuccessResponse.data = flight;
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

async function getAllFlights(req,res){
    try{
       //console.log(req.query, "query data");
        const flights = await FlightService.getAllFlights(req.query);
        SuccessResponse.data = flights;
        return res
                 .status(StatusCodes.CREATED)
                 .json(SuccessResponse);
    }catch(error){
        ErrorResponse.error = error;
        return res 
                  .status(error.statuscode)
                  .json(ErrorResponse);
    }
}

/**
 * POST : /flights/:id 
 * req-body {}
 */
async function getFlight(req, res) {
    try {
        const flight = await FlightService.getFlight(req.params.id);
        SuccessResponse.data = flight;
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

 async function updateSeats(req, res) {
    try {
        const response = await FlightService.updateSeats({
            flightId: req.params.id,
            seats: req.body.seats,
            dec: req.body.dec
        });
        SuccessResponse.data = response;
        return res
              .status(StatusCodes.OK)
              .json(SuccessResponse);

    } catch (error) {
        ErrorResponse.error = error;
        return res
              .status(error.statuscode)
              .json(ErrorResponse);
        
    }
 }
module.exports = {
createflight,
getAllFlights,
getFlight,
updateSeats

}