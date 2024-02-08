const Joi = require('joi');
const {Roles} = require('../models');

const createRoleSchema = Joi.object({
    name:Joi.string().required(),
    code:Joi.string().required().min(3).external(async(code)=>{
        let existscode = await Roles.findOne({
            where:{code:code}
        });
        if(existscode){
            throw new Error(`Code '${code}' sudah digunakan`);
        }

        return code;
    }),
    description:Joi.string()
});

module.exports = {
    createRoleSchema
}