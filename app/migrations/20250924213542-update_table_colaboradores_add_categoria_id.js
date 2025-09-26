'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('colaboradores', 'categoria_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'colaborador_categorias',
        key: 'id',
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('colaboradores', 'categoria_id');
  },
};
