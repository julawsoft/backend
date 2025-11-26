'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processo_factura_items', 'tipo', {
      type: Sequelize.ENUM('timesheet', 'despesas'),
      defaultValue: 'timesheet',
      allowNull: false, 
    });
    await queryInterface.addColumn('processo_factura_items', 'tipo_id', {
      type: Sequelize.INTEGER,
      allowNull: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processo_factura_items', 'tipo');
    await queryInterface.removeColumn('processo_factura_items', 'tipo_id');
  },
};
