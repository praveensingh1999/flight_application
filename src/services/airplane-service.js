const {StatusCodes} = require('http-status-codes');
const { AirplaneRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');
const airplaneRepository = new AirplaneRepository();
async function createAirplane(data) {
    try {
        const airplane = await airplaneRepository.create(data);
        return airplane;
    } catch(error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplanes() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch(error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAirplane(id) {
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch(error) {
        if(error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statuscode);
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id) {
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested to delete is not present', error.statuscode);
        }
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirplane(data,id)
{
      try{
        console.log(data,id,"praveen");
             const response= await airplaneRepository.update(data,id);
             console.log(response,"final");
             return response;
      }
      catch(error){

        if(error.statuscode==StatusCodes.NOT_FOUND)
        {
               throw new AppError('The airplane you requested to update is not present ',error.statuscode);
        }

        throw new AppError('Not able to fectch data of all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR)

      }
}


module.exports = {
    createAirplane,
    getAirplanes,
    
    getAirplane,
    destroyAirplane,
    updateAirplane
}