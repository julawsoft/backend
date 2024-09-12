const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class TipoColaborador extends Model {
  static associate(models) {}
}

TipoColaborador.init({
  description: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'TipoColaborador',
  tableName: 'tipo_colaboradores',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * @returns {Object}
 */
async function listAll() {
  return TipoColaborador.findAll()
}

/**
 * @param id number
 * @returns {Object} TipoColaborador
 */

async function listById(id) {
  return await TipoColaborador.findOne({where: {id}})
}

module.exports = {
    listAll,
    listById,
    TipoColaborador
};
