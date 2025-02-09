'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processo_tarefas', 'data_realizada', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('processo_tarefas', 'data_aprovada', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processo_tarefas', 'data_realizada');
    await queryInterface.removeColumn('processo_tarefas', 'data_aprovada');
  },
};
