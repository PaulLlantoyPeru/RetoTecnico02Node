'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lender extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Lender.init({
    documentNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    resting: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Lender',
    indexes: [
      {
        unique: true,
        fields:['documentNumber']
      }
    ]
  });

  Lender.associate = function(models) {
    Lender.hasMany(models.NewCredit, {as: 'newCredits'})
    Lender.hasMany(models.Payments, {as: 'newPayments'})
  };
  return Lender;
};