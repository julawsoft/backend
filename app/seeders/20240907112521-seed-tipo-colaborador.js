'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipo_colaboradores', [
      {
        description: 'Administrativo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Advogado - Efectivo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Advogado - Estagiário',
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
