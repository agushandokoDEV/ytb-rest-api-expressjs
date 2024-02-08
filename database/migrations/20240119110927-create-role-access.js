'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('role_access', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      role_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      menu_id: {
        type: Sequelize.UUID,
        allowNull: false
      },
      allow: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('role_access');
  }
};