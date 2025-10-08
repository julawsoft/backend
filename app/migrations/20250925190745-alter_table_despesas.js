'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('despesas ', 'tipoMovimento');
    await queryInterface.addColumn('despesas', 'tipo_despesa', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('despesas', 'tipo_despesa');
  },
};
