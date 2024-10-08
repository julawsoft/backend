'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('processos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },  
      ref: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      assunto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      area: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fase: {
        type: Sequelize.ENUM('Extrajudicial', 'Judicial'),
        allowNull: false,
      },
      instituicao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processo_instituicoes',
          key: 'id',
        },
      },
      modo_facturacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processo_facturacao',
          key: 'id',
        },
      },
      gestor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
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
      contra_parte: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data_registo: {
        allowNull: false,
        type: Sequelize.DATE
      },
      data_suspensao: {
        allowNull: true,
        type: Sequelize.DATE
      },
      colaborador_id_suspendeu: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'colaboradores',
          key: 'id',
        },
      },
      data_encerramento: {
        allowNull: true,
        type: Sequelize.DATE
      },
      colaborador_id_encerrou: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'colaboradores',
          key: 'id',
        },
      },
      metodologia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      estrategia: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      factos: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      objectivos: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      dados_importantes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      status_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processo_estado',
          key: 'id',
        },
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
    await queryInterface.dropTable('processos');
  }
};
