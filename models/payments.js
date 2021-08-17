'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Payments.init({
    datetime_payment: DataTypes.DATE,
    amount_payment: {
      type: DataTypes.FLOAT(10,2),
    },
    receptor: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payments',
  });

  Payments.associate = function(models) {
    Payments.belongsTo(models.NewCredit, {foreignKey: 'NewCreditId', as: 'credit'})
    Payments.belongsTo(models.Lender, {foreignKey: 'collectorId', as: 'collector'})
  }
  return Payments;
};