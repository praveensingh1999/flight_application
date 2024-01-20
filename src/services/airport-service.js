const {StatusCodes} = require('http-status-codes');
const { AirportRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const airportRepository = new AirportRepository();
async function createAirport(data) {
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch(error) {
       // console.log(error, "what error");
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirport(id) {
    try {
        const airport = await airportRepository.get(id);
        return airport;
    } catch(error) {
        if(error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested is not present', error.statuscode);
        }
        throw new AppError('Cannot fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id) {
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airport you requested to delete is not present', error.statuscode);
        }
        throw new AppError('Cannot fetch data of all the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(data,id)
{
      try{
        // console.log(data,id,"praveen");
             const response= await airportRepository.update(data,id);
            //  console.log(response,"final");
             return response;
      }
      catch(error){

        if(error.statuscode==StatusCodes.NOT_FOUND)
        {
               throw new AppError('The airport you requested to update is not present ',error.statuscode);
        }

        throw new AppError('Not able to fectch data of all the airport',StatusCodes.INTERNAL_SERVER_ERROR)

      }
}


module.exports = {
    createAirport,
    getAirport,
    getAirports,
    destroyAirport,
    updateAirport
}