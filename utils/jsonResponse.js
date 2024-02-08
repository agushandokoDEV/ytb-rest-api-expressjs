// util/response.js
const successResponse = (res, data=null,message='Ok',code=200) => {

    res.status(code).json({
        success:true,
        message:message,
        data:data
    });
};

const errorResponse = (res, message, code=500, error=[]) => {
    
    res.status(code).json({
        success:false,
        message : message,
        error : error
    });
};

module.exports = { successResponse, errorResponse };
