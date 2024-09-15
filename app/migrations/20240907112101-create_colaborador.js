'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('colaboradores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome_completo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_profissional: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      inicial: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      funcao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_colaborador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_nascimento: {
        type: Sequelize.DATE,
        allowNull: true
      },
      token_reset: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      uuid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    await queryInterface.dropTable('colaboradores');
  }
};
