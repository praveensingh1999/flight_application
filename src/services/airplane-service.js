const {statusCodes, StatusCodes} = require('http-status-codes');
const {AirplaneRepository}=require('../repositories');
const AppError = require('../utils/error/app-error');
const airplaneRepository = new AirplaneRepository();
async function createAirplane(data){
    try{
        const airplane=await airplaneRepository.create(data);
        return airplane;
    }catch(error){
        if(error.name=='SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation,statusCodes.BAD_REQUEST);

        }
        throw new AppError('Cannot create anew Airplane object', statusCodes.INTERNAL_SERVER_ERROR);
    }

}

async function getAirplanes(){
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes' , statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane = await airplaneRepository.get(id);
        return airplane;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested are not found', error.statusCode);
        }
        throw new AppError('Cannot fetch data of all the airplanes' , StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane
}