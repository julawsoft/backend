'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processo_tarefas', 'colaborador_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn('processo_tarefas', 'gestor_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processo_tarefas', 'colaborador_id');
    await queryInterface.removeColumn('processo_tarefas', 'gestor_id');
  },
};
