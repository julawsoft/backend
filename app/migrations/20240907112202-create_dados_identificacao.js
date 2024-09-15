'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dados_identificacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tipo_documento_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'tipo_doc_identificacao',
          key: 'id',
        },
        onUpdate: 'CASCADE', // Ação em atualizações
        onDelete: 'SET NULL', // Ação em deleções
      },
      valor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      data_emissao: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      data_validade: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      colaborador_id: {
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

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dados_identificacao');
  }
};
