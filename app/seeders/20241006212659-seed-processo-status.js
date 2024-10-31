'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('processo_estado', [
      {
        descricao: 'Rascunho',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Proposta',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Suspenso',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Encerrado',
        created_at: new Date(),
        updated_at: new Date(),
      },
  ], {});
      },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processo_estado', null, {});
  }
};
