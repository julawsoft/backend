const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class TipoDocIdentificacao extends Model {
  static associate(models) {}
}

TipoDocIdentificacao.init({
  description: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'TipoDocIdentificacao',
  tableName: 'tipo_doc_identificacao',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * @returns {Object}
 */
async function listAll() {
  return TipoDocIdentificacao.findAll()
}

/**
 * @param id number
 * @returns {Object} TipoDocIdentificacao
 */

async function listById(id) {
  return await TipoDocIdentificacao.findOne({where: {id}})
}

module.exports = {
    listAll,
    listById,
    TipoDocIdentificacao
};
