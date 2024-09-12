const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class DadosIdentificacao extends Model {
  static associate(models) {}
}

DadosIdentificacao.init({
  tipo_documento_id: {
    type: DataTypes.STRING
  },
  data_emissao: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_validade: {
    type: DataTypes.DATE,
    allowNull: true

  },
  colaboradorId: {
    type: DataTypes.NUMBER
  },
}, {
  sequelize,
  modelName: 'DadosIdentificacao',
  tableName: 'dados_identificacao',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * @returns {Object}
 */
async function listAll() {
  return DadosIdentificacao.findAll()
}

/**
 * @param id number
 * @returns {Object} DadosIdentificacao
 */

async function listById(id) {
  return await DadosIdentificacao.findOne({where: {id}})
}

module.exports = {
    listAll,
    listById,
    DadosIdentificacao
};
