'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tipo_eventos_timesheet', [
      {
        label: 'Consultas e pareceres jurídicos',
        descricao: 'Atividades relacionadas à emissão de pareceres e consultas técnicas sobre o caso.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Reuniões com o cliente',
        descricao: 'Tempo dedicado a discutir o caso com o cliente ou partes envolvidas.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Análise de documentos',
        descricao: 'Tempo investido na leitura e revisão de contratos, pareceres ou outros documentos relacionados ao processo.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        label: 'Audiências e sessões de julgamento',
        descricao: 'Tempo utilizado para comparecer e participar de audiências e julgamentos.',
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
