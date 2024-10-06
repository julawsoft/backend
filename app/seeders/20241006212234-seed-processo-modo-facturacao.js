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
        descricao: 'Taxa horária',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Valor Fixo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'Sucess fee',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        descricao: 'pro bono',
        created_at: new Date(),
        updated_at: new Date(),
      },
  ], {});
      },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('processo_facturacao', null, {});
  }
};
