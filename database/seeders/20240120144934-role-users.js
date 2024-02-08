'use strict';

const { v4: uuidv4 } = require('uuid');
const {User,Roles,RoleUsers} = require('../../app/models');

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

    if(user){
      RoleUsers.create({
        id: uuidv4(),
        user_id:user.id,
        role_id:user.role_id
      });
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
