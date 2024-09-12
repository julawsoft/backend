const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class DadosContacto extends Model {
  static associate(models) {}
}

DadosContacto.init({
  type: {
    type: DataTypes.STRING
  },
  value: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING
  },
  colaboradorId: {
    type: DataTypes.NUMBER
  },
}, {
  sequelize,
  modelName: 'DadosContacto',
  tableName: 'dados_contactos',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * @returns {Object}
 */
async function listAll() {
  return DadosContacto.findAll()
}

/**
 * @param id number
 * @returns {Object} DadosContacto
 */

async function listById(id) {
  return await DadosContacto.findOne({where: {id}})
}

module.exports = {
    listAll,
    listById,
    DadosContacto
};
