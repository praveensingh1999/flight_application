const {StatusCodes} = require('http-status-codes');
const {CityRepository } = require('../repositories');
const AppError = require('../utils/error/app-error');


const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        //console.log(error);
        
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            
            let explanation = [];
            error.errors.forEach((err) => {
                explanation.push( err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch(error) {
        if(error.statuscode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested to delete is not present', error.statuscode);
        }
        throw new AppError('Cannot fetch data of all the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(data,id)
{
      try{
        // console.log(data,id,"praveen");
             const response= await cityRepository.update(data,id);
            //  console.log(response,"final");
             return response;
      }
      catch(error){

        if(error.statuscode==StatusCodes.NOT_FOUND)
        {
               throw new AppError('The city you requested to update is not present ',error.statuscode);
        }

        throw new AppError('Not able to fectch data of all the city',StatusCodes.INTERNAL_SERVER_ERROR)

      }
}



module.exports = {
    createCity,
    destroyCity,
    updateCity
  
}