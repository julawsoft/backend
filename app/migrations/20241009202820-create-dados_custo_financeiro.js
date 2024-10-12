'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('dados_custo_financeiro', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      taxa_horaria: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }
  );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('custo_financeiro');

  }
};