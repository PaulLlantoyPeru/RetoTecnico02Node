'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class NewCredit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  NewCredit.init({
    loan_amount: {
      type: DataTypes.FLOAT(10,2),
    },
    payment_amount: {
      type: DataTypes.FLOAT(10,2),
    },
    tasa: {
      type: DataTypes.FLOAT(4,2),
    },
    datetime_start: DataTypes.DATE,
    datetime_last_pay : DataTypes.DATE,
    datetime_end: DataTypes.DATE,
    frecuency: DataTypes.INTEGER,
    uri_evidencia: DataTypes.STRING,
    total_amount:{
      type: DataTypes.FLOAT(10,2),
    },
    partial_amount: {
      type: DataTypes.FLOAT(10,2),
    },
    status:{
      type: DataTypes.STRING,
      isIn: [['PENDIENTE', 'CANCELADO', 'PAGADO']],
    },
    lender_resting: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'NewCredit',
  });

  NewCredit.associate = function(models) {
    NewCredit.belongsTo(models.Lender, {foreignKey: 'LenderId', as: 'lender'})
    NewCredit.belongsTo(models.Client, {foreignKey: 'ClientId', as: 'client'})
    NewCredit.hasMany(models.Payments, {as: 'newPayments'})
  }
  return NewCredit;
};