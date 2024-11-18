'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('colaboradores', [
      {
        nome_completo: 'Julaw Administrador',
        nome_profissional: 'Julaw Admin',
        inicial: 'J A',
        funcao: 'administrativo',
        tipo_colaborador_id: 1,
        uuid: '9c64b6c2-6907-4674-a932-5720f71a7c05',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
     
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
