'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('processos_timesheet', 'user_submetido', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'colaboradores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    await queryInterface.addColumn('processos_timesheet', 'user_aprovado', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'colaboradores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    await queryInterface.addColumn('processos_timesheet', 'user_rejeitado', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'colaboradores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    await queryInterface.addColumn('processos_timesheet', 'user_faturado', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'colaboradores',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    });
    await queryInterface.addColumn('processos_timesheet', 'status', {
      type: Sequelize.ENUM('rascunho', 'submetido', 'aprovado', 'rejeitado','faturado'),
      defaultValue: 'rascunho',
      allowNull: false, 
    });
    await queryInterface.addColumn('processos_timesheet', 'notas', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('processos_timesheet', 'data_submetido', {
      type: Sequelize.DATE,
      allowNull: true, 
    });
    await queryInterface.addColumn('processos_timesheet', 'data_aprovado', {
      type: Sequelize.DATE,
      allowNull: true, 
    });
    await queryInterface.addColumn('processos_timesheet', 'data_rejeitado', {
      type: Sequelize.DATE,
      allowNull: true, 
    });
    await queryInterface.addColumn('processos_timesheet', 'data_faturado', {
      type: Sequelize.DATE,
      allowNull: true, 
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('processos_timesheet', 'status');
  },
};
