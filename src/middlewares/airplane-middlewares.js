const {StatusCodes} = require('http-status-codes');
const { ErrorResponse } = require('../utils/common');

const AppError = require('../utils/error/app-error');
function validateCreateRequest(req,res,next){
    if(!req.body.modelNumber){
        ErrorResponse.message='Something went wrong while creating airplane';
        ErrorResponse.error = new AppError (['Model number not found  in the oncoming request in the correct form'],StatusCodes.BAD_REQUEST);
    
        return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ErrorResponse);
    }
    next();
}


// function validateCreateRequest(req, res, next){
//     if(!req.body.modelNumber){
//         return res
//                .status(StatusCodes.BAD_REQUEST)
//                .json({
//                 success: false,
//                 message: 'Something went wrong while creating airplane',
//                 data: {},
//                 error: {explanation: 'Model number not found  in the oncoming request in the correct form'}
//                });
  //  }
 //   next();
// }

module.exports={
    validateCreateRequest
}
