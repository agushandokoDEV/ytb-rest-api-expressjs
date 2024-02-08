const Joi = require('joi');

const {Menu} = require('../models');

const updateAccessSchema = Joi.object({
    // role_id: Joi.string().uuid().required().external(async (value) => {
    //     // Perform custom existence check here, for example using a database query
    //     // Assume `checkRoleExistence` is a function that checks if the role exists
    //     const roleExists = await checkRoleExistence(value);
    //     if (!roleExists) {
    //         throw new Error('Role does not exist');
    //     }
    // }),
    menu: Joi.array().required().items(
        Joi.object({
            id: Joi.string().uuid().required().external(async (id) => {
                // Perform custom existence check for admin_menu
                const menuExists = await Menu.findByPk(id);
                if (!menuExists) {
                    throw new Error('Admin menu does not exist');
                }
                return id
            }),
            allow: Joi.boolean().required(),
        })
    ),
});

// async function checkRoleExistence(roleId) {
//   // Implement your logic to check if the role exists
//   return true; // Return true if the role exists, false otherwise
// }

// async function checkAdminMenuExistence(menuId) {
//   // Implement your logic to check if the admin_menu exists
//   return true; // Return true if the admin_menu exists, false otherwise
// }

module.exports = {
    updateAccessSchema
}