'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('colaboradores', 'contacto_pessoal', {
      type: Sequelize.INTEGER,
      allowNull: false
    });
    await queryInterface.addColumn('colaboradores', 'contacto_emergencia', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addColumn('colaboradores', 'n_identificacao', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn('colaboradores', 'n_cedula_ordem', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('colaboradores', 'email_pessoal', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('colaboradores', 'email_corporativo', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('colaboradores', 'contacto_pessoal');
    await queryInterface.removeColumn('colaboradores', 'contacto_emergencia');
    await queryInterface.removeColumn('colaboradores', 'n_identificacao');
    await queryInterface.removeColumn('colaboradores', 'n_cedula_ordem');
    await queryInterface.removeColumn('colaboradores', 'email_pessoal');
    await queryInterface.removeColumn('colaboradores', 'email_corporativo');
  },
};
