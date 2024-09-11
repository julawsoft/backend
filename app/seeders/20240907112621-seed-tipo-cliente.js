'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipo_cliente', [
      {
        description: 'Empresa',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Particular',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Ministério',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Instituto Público',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Associação',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Outro',
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
