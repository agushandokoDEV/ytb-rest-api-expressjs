'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleUsers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.RoleUsers.belongsTo(models.Roles, { foreignKey: 'role_id',as:'role' });
      models.RoleUsers.belongsTo(models.User, { foreignKey: 'user_id',as:'user' });
    }
  }
  RoleUsers.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'RoleUsers',
    tableName: 'role_users',
    timestamps: true,
  });
  return RoleUsers;
};