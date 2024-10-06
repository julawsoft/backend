'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('processo_precedentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },  
      processo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processos',
          key: 'id',
        },
      },
      precedente_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'processos',
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
    await queryInterface.dropTable('processo_precedentes');
  }
};
