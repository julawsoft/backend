'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processos_timesheet', 'tarefa_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'processo_tarefas',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    await queryInterface.changeColumn('processos_timesheet', 'tipo_evento_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.changeColumn('processos_timesheet', 'processo_id', {
      type: Sequelize.INTEGER,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processos_timesheet', 'tarefa_id');
    await queryInterface.changeColumn('processos_timesheet', 'processo_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // volta a ser obrigatória
    });
    await queryInterface.changeColumn('processos_timesheet', 'tipo_evento_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // volta a ser obrigatória
    });
  },
};
