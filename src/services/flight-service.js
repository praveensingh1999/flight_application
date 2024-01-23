const { StatusCodes } = require('http-status-codes');

const { Op } = require('sequelize');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');

async function createFlight(data) {
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    // trips=MUM-DEL
    if(query.trips) {

       [departureAirportId, arrivalAirportId] = query.trips.split("-"); 
       customFilter.departureAirportId = departureAirportId;
       customFilter.arrivalAirportId = arrivalAirportId;
       // TODO: add a check that they are not same
    }
    if(query.price) {
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, ((maxPrice == undefined) ? 20000: maxPrice)]
        }
    }
    if(query.travellers) {
        customFilter.totalSeats = {
            [Op.gte]: query.travellers
        }
    }
    if(query.tripDate) {
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate + endingTripTime]
        }
    }
    if(query.sort) {
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters
    }
   // console.log(customFilter, sortFilter);
    try {
        const flights = await FlightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
async function getFlight(id){
    try {
        const flight = await FlightRepository.get(id);
        return flight;
    } catch(error) {
        if(error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statuscode);
        }
        throw new AppError('Cannot fetch data of all the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }

}
module.exports = {
    createFlight,
    getAllFlights,
    getFlight
}