'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeeTime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeeTime.belongsTo(models.User, {foreignKey: "username",  onDelete: "CASCADE", })
    }
  }
  TeeTime.init({
    time: DataTypes.DATE,
    username: {
      type: DataTypes.STRING,
      references: {
        model: "Users"
      }
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    players: DataTypes.INTEGER,
    open: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'TeeTime',
  });
  return TeeTime;
};