'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Planetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      clima: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      diametro: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gravedad: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING
      },
      periodoDeOrbita: {
        allowNull: false,
        type: Sequelize.STRING
      },
      poblacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      periodoDeRotacion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      SuperficieDelAgua: {
        allowNull: false,
        type: Sequelize.STRING
      },
      terreno: {
        allowNull: false,
        type: Sequelize.STRING
      },
      url: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Planetas');
  }
};