const {statusCodes} = require('http-status-codes');
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
module.exports={
    createAirplane
}