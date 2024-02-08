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
          last_login: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ], { returning: true, transaction });
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
