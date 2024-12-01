'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('modo_pagamento', [
      {
        descricao: 'Transferência Bancária',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Depósito',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Cash',
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
