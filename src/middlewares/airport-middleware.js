const {StatusCodes} = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

const AppError = require('../utils/error/app-error');


function validateCreateRequest(req,res,next){
    
    
    if(!req.body.name){
        ErrorResponse.message='Something went wrong while creating airport';
        ErrorResponse.error = new AppError (['aiport name not found  in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
    
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    if(!req.body.code){
        ErrorResponse.message='Something went wrong while creating airport';
        ErrorResponse.error = new AppError (['aiport code not found  in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
    
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    
    if(!req.body.cityId){
        ErrorResponse.message='Something went wrong while creating airport';
        ErrorResponse.error = new AppError (['aiport cityId not found  in the incoming request in the correct form'],StatusCodes.BAD_REQUEST);
    
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }

    next();
}
module.exports={
    validateCreateRequest
}