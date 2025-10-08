'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'tipos_tarefas',
      [
        { label: 'Análise', descricao: 'Análise', created_at: new Date(), updated_at: new Date() },
        { label: 'Audiência', descricao: 'Audiência', created_at: new Date(), updated_at: new Date() },
        { label: 'Chamada', descricao: 'Chamada', created_at: new Date(), updated_at: new Date() },
        { label: 'Consulta de processo', descricao: 'Consulta de processo', created_at: new Date(), updated_at: new Date() },
        { label: 'Consulta jurídica', descricao: 'Consulta jurídica', created_at: new Date(), updated_at: new Date() },
        { label: 'Deslocação', descricao: 'Deslocação', created_at: new Date(), updated_at: new Date() },
        { label: 'Diverso', descricao: 'Diverso', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Contestação', descricao: 'Elaboração de Contestação', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Contrato', descricao: 'Elaboração de Contrato', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de documento diverso', descricao: 'Elaboração de documento diverso', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Parecer', descricao: 'Elaboração de Parecer', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Petição', descricao: 'Elaboração de Petição', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Relatório', descricao: 'Elaboração de Relatório', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Réplica', descricao: 'Elaboração de Réplica', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Requerimento', descricao: 'Elaboração de Requerimento', created_at: new Date(), updated_at: new Date() },
        { label: 'Elaboração de Tréplica', descricao: 'Elaboração de Tréplica', created_at: new Date(), updated_at: new Date() },
        { label: 'E-mail', descricao: 'E-mail', created_at: new Date(), updated_at: new Date() },
        { label: 'Estudo', descricao: 'Estudo', created_at: new Date(), updated_at: new Date() },
        { label: 'Evento', descricao: 'Evento', created_at: new Date(), updated_at: new Date() },
        { label: 'Formação', descricao: 'Formação', created_at: new Date(), updated_at: new Date() },
        { label: 'Impressão', descricao: 'Impressão', created_at: new Date(), updated_at: new Date() },
        { label: 'Leitura', descricao: 'Leitura', created_at: new Date(), updated_at: new Date() },
        { label: 'Mensagem', descricao: 'Mensagem', created_at: new Date(), updated_at: new Date() },
        { label: 'Organização de processo', descricao: 'Organização de processo', created_at: new Date(), updated_at: new Date() },
        { label: 'Reunião', descricao: 'Reunião', created_at: new Date(), updated_at: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    // Remove todas as tarefas inseridas
    await queryInterface.bulkDelete('tipos_tarefas', null, {});
  },
};
