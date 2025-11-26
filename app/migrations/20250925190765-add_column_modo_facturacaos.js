'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.removeColumn('despesas ', 'tipoMovimento');
    await queryInterface.addColumn('processo_facturacao', 'is_payment', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    });
    await queryInterface.addColumn('processo_facturacao', 'is_unique_payment', {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processo_facturacao', 'is_payment');
    await queryInterface.removeColumn('processo_facturacao', 'is_unique_payment');
  },
};
