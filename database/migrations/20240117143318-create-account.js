'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('account', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        // references: {
        //   model: 'users',
        //   key: 'id',
        // },
        allowNull: false,
      },
      fullname: {
        type: Sequelize.STRING(70),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('account');
  }
};