'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pagamento_factura', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },   
      factura_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processo_facturas',
          key: 'id',
        },
      },   
      colaborador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'colaboradores',
          key: 'id',
        },
      },
      modo_pagamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'modo_pagamento',
          key: 'id',
        },
      },
      valor_factura: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      valor_pago: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      valor_restante: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      anexo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      desconto:{
        type: Sequelize.INTEGER,
        allowNull: true
      },  
      obs: {
        type: Sequelize.TEXT,
        allowNull: true,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pagamento_factura');
  }
};
