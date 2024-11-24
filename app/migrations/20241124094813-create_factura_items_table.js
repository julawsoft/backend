'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('processo_factura_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },  
      processo_factura_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processo_facturas',
          key: 'id',
        },
      },
      processos_timesheet_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'processos_timesheet',
          key: 'id',
        },
      }, 
      horas: {
        allowNull: true,
        type: Sequelize.STRING
      },
      custo: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      dados_adicionais: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('processo_factura_items')
  }
};
