'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('despesas', 'created_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });

    await queryInterface.addColumn('despesas', 'updated_at', {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('despesas', 'created_at');
    await queryInterface.removeColumn('despesas', 'updated_at');
  },
};
