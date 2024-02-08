'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Account.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }
  Account.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type:DataTypes.UUID,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Account',
    tableName: 'account',
    timestamps: true,
    underscored: true,
    paranoid: true,
    deletedAt: 'deleted_at'
  });
  return Account;
};