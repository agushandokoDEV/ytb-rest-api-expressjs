// const express = require('express');
// const router  = express.Router();

const { successResponse, errorResponse } = require('../../utils/jsonResponse');
const User = require('../models').User;

const WelcomeController = {
    index:(req,res)=>{
        successResponse(res,"Welcome Railway");
    },
    listusers: async (req,res)=>{
        try {
            let list = await User.findAll();
            successResponse(res,list);
        } catch (error) {
            errorResponse(res,error.message)
        }
    }
}
module.exports = WelcomeController;