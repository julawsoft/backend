'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('processo_facturacao', [
      {
        descricao: 'Avença',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Success Fee',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Fixo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Probono',
        created_at: new Date(),
        updated_at: new Date(),
      },
  ], {});
      },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processo_facturacao', null, {});
  }
};
