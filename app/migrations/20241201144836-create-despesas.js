'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('despesas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProcesso: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      valor: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipoMovimento: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      dataMovimento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('despesas');
  }
};