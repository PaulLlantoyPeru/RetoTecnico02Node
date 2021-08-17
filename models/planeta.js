'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Client.init({
    clima: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    diametro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gravedad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periodoDeOrbita: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poblacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    periodoDeRotacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    SuperficieDeAgua: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    terreno: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  }, {
    sequelize,
    modelName: 'Client',
  });

  Client.associate = function(models) {
    Client.hasMany(models.NewCredit, {as: 'newCredits'})
  };
  return Client;
};