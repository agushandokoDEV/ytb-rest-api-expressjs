const Joi = require('joi');

const changeRoleSchema = Joi.object({
    role_id:Joi.string().uuid().required()
});

module.exports = {
    changeRoleSchema
}