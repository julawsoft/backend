'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processo_tarefas', 'cliente_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'clientes', // nome da tabela referenciada
        key: 'id', // chave primária da tabela clientes
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    await queryInterface.addColumn('processo_tarefas', 'tipo_tarefa_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'tipos_tarefas', // se houver tabela de tipos de tarefa
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });

    await queryInterface.changeColumn('processo_tarefas', 'processo_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // agora a coluna pode ser nula
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processo_tarefas', 'cliente_id');
    await queryInterface.removeColumn('processo_tarefas', 'tipo_tarefa_id');
    await queryInterface.changeColumn('processo_tarefas', 'processo_id', {
      type: Sequelize.INTEGER,
      allowNull: false, // volta a ser obrigatória
    });
  },
};
