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
        description: 'Ordem dos Advogados',
        code: 'Ord. Adv',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});

  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('tipo_doc_identificacao', null, {});
  }
};
