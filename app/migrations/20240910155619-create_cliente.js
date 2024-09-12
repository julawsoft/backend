'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      denominacao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_cliente',
          key: 'id',
        },
      },
      nif: {
        type: Sequelize.STRING,
        allowNull: true
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      pessoa_contacto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      contacto_cobranca: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nota: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'pending'),
        allowNull: false,
        defaultValue: 'pending',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('clientes');
  }
};
