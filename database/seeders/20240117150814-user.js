'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const {Roles} = require('../../app/models');

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

    let role = await Roles.findOne({
        where:{
            code:'super.admin'
        }
    });

    try {
      // Insert into 'users' table
      const [user] = await queryInterface.bulkInsert('users', [
        {
          id: uuidv4(),
          username: 'super.admin',
          email: null,
          email_verified_at: new Date(),
          password: bcrypt.hashSync('admin', 10),
          as: 'admin',
          role_id:role?.id,
          last_login: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], { returning: true, transaction });

      // Insert into 'accounts' table using the retrieved user ID
      await queryInterface.bulkInsert('account', [
        {
          id: uuidv4(),
          user_id: user.id, // Use the user ID from the previous insert
          fullname: 'Super Admin',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], { transaction });

      // Commit the transaction
      await transaction.commit();
    } catch (error) {
      // If an error occurs, log the error and rollback the transaction
      console.error('Error in seed:', error.message);
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
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('account', null, {});
  }
};
