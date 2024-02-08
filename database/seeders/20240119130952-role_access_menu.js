'use strict';
const { v4: uuidv4 } = require('uuid');
const {User,Menu,RoleAccess} = require('../../app/models');

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const transaction = await queryInterface.sequelize.transaction();

    let user = await User.findOne({
        where:{
            username:'super.admin'
        }
    });

    let listmenu = await Menu.findAll({
      order:[
        ['sorting','asc']
      ]
    });

    try {
      listmenu.forEach(async(menu) => {
      await RoleAccess.findOne({
        where:{
          role_id:user.role_id,
          menu_id:menu.id
        }
      }).then(async(access) => {
        if(!access){
          RoleAccess.create({
            id: uuidv4(),
            role_id:user.role_id,
            menu_id:menu.id,
            allow:true
          });
        }
      }).catch((err) => {
        
      });
      
    });
    await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
