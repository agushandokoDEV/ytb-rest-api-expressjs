// const express = require('express');
// const router  = express.Router();

const { successResponse } = require('../../utils/jsonResponse');
const User = require('../models').User;

const WelcomeController = {
    index:(req,res)=>{
        successResponse(res,"Welcome Railway");
    },
    listusers: async (req,res)=>{
        let list = await User.findAll();
        successResponse(res,list);
    }
}
module.exports = WelcomeController;