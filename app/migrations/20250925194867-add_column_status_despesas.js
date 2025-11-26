'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('despesas', 'status', {
      type: Sequelize.ENUM('pendente','faturado'),
      defaultValue: 'pendente',
      allowNull: false, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('despesas', 'status');
  },
};
