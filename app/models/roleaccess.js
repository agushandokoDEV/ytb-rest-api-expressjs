'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RoleAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  RoleAccess.init({
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
    menu_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    allow: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue:false
    },
  }, {
    sequelize,
    modelName: 'RoleAccess',
    tableName: 'role_access',
    timestamps: true,
  });
  return RoleAccess;
};