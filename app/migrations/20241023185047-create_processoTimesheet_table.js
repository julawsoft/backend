'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('processos_timesheet', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },  
      tipo_evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_eventos_timesheet',
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
      cliente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'clientes',
          key: 'id',
        },
      },
      processo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processos',
          key: 'id',
        },
      },
      modo_facturacao: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taxa_processo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      taxa_colaborador: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descricao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      dados_importantes: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data_inicio: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_fim: {
        allowNull: false,
        type: Sequelize.DATE
      },
      horas: {
        allowNull: false,
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
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('processos_timesheet');
  }
};
