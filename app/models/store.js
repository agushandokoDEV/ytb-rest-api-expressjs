'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Store.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type:DataTypes.STRING
    },
    active: {
      type:DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Store',
    tableName: 'store',
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Store;
};