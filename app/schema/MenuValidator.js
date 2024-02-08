const Joi = require('joi');
const {Menu} = require('../models');

const createMenuSchema = Joi.object({
    title:Joi.string().required().min(2),
    key:Joi.string().required().min(2).external(async(key)=>{
        let exists = await Menu.findOne({
            where:{key}
        });
        if(exists){
            throw new Error(`Key '${key}' sudah digunakan`)
        }
    }),
    url:Joi.string().required().min(2).allow(null),
    parent_id:Joi.string().allow(null).external(async(parent_id)=>{
        let exists = Menu.findByPk(parent_id);
        if(!exists){
            throw new Error(`Parent ID '${parent_id}' tidak tersedia`)
        }
    }),
    icon:Joi.string().allow(null),
    description:Joi.string(),
    active:Joi.boolean().required(),
    is_menu:Joi.boolean().required(),
});

const updateMenuSchema = Joi.object({
    title:Joi.string().required().min(2),
    url:Joi.string().required().min(2).allow(null),
    parent_id:Joi.string().allow(null).external(async(parent_id)=>{
        let exists = await Menu.findByPk(parent_id);
        if(!exists){
            throw new Error(`Menu ID '${parent_id}' tidak tersedia`)
        }
    }),
    icon:Joi.string().allow(null),
    description:Joi.string().allow(null),
    active:Joi.boolean().required(),
    is_menu:Joi.boolean().required(),
});

module.exports = {createMenuSchema,updateMenuSchema}