'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipos_despesas', [
      {
        label: 'Autenticação',
        descricao: 'Autenticação',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Caução',
        descricao: 'Caução',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Despesa societária',
        descricao: 'Despesa societária',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Guia',
        descricao: 'Guia',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Reconhecimento',
        descricao: 'Reconhecimento',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Taxa',
        descricao: 'Taxa',
        created_at: new Date(),
        updated_at: new Date(),
      }     
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
