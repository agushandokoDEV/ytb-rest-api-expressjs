const Joi = require('joi');
const {User,Roles} = require('../models');

const createUserSchema = Joi.object({
    // password:Joi.string().required().min(6),
    fullname:Joi.string().required().min(3),
    username:Joi.string().required().min(3).external(async(username)=>{
        let existsUsername = await User.findOne({
            where:{username}
        });
        if(existsUsername){
            throw new Error(`Username '${username}' sudah digunakan`);
        }

        return username;
    }),
    // role_id:Joi.string().required(),
    role_id:Joi.string().required().external(async(role_id)=>{
        let existsRole = await Roles.findByPk(role_id);
        if(!existsRole){
            throw new Error(`Role '${role_id}' tidak terdaftar`);
        }

        return role_id;
    }),
    // as:Joi.string().required()
});

module.exports = {
    createUserSchema
}