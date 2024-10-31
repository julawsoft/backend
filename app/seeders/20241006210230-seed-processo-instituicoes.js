'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('processo_instituicoes', [
      {
        descricao: 'SIC',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'PGR',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Tribunal Comarca',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Tribunal Relação',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Tribunal Supremo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Tribunal Constitucional',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Tribunal de Contas',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Tribunal Militar',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Outro',
        created_at: new Date(),
        updated_at: new Date(),
      },
  ], {});
      },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processo_instituicoes', null, {});
  }
};
