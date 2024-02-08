'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('menu', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      key: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      icon: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      sorting: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      parent_id: {
        type: Sequelize.UUID,
        // references: {
        //   model: 'menu', // Assuming 'menu' is the name of the related table
        //   key: 'id',
        // },
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
      is_menu: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('menu');
  }
};