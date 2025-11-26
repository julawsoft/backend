'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processo_facturas', 'tipo_honorario', {
      type: Sequelize.ENUM('timesheet', 'despesas'),
      defaultValue: 'timesheet',
      allowNull: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processo_facturas', 'tipo_honorario');
  },
};
