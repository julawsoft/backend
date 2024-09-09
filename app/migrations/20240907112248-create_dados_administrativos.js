'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dados_administrativos', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      group: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isUser: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      isLawyer: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      colaboradorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'colaboradores',
          key: 'id',
        },
        onUpdate: 'CASCADE', // Ação em atualizações
        onDelete: 'SET NULL', // Ação em deleções
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('dados_administrativos');
  }
};
