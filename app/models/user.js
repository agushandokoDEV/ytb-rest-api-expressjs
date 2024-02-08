'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.User.belongsTo(models.Roles, { foreignKey: 'role_id' });
      models.User.hasOne(models.Account, { foreignKey: 'user_id' });
      // models.Roles.belongsTo(models.User, { foreignKey: 'role_id' });
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    as: {
      type: DataTypes.STRING,
    },
    last_login: {
      type: DataTypes.DATE,
    },
    // status: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue:'pending'
    // },
    // role_id: {
    //   type:DataTypes.UUID,
    //   allowNull: false,
    // },
    // created_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // updated_at: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    // deleted_at: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return User;
};