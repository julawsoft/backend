'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('tipo_doc_identificacao', [
      {
        description: 'Billhete de Identidade',
        code: 'BI',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Passaporte',
        code: 'Passaporte',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Cartão de Residente',
        code: 'C. Residente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Cédula OAA',
        code: 'Cédula OAA',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        description: 'Outro',
        code: 'Outro',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('tipo_doc_identificacao', null, {});
  }
};
