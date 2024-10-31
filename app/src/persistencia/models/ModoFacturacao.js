const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * 
 * @class
 */
class ModoFacturacao extends Model {
  static associate(models) { }
}

ProcessoEstado.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  obesevacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ModoFacturacao',
  tableName: 'processo_facturacao',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {string} descricao
* @param {string} obesevacao
* @returns {ModoFacturacao}
*/
async function create(
  {
    descricao,
    obesevacao
  }
) {

  return await ModoFacturacao.create({
    "descricao": descricao,
    "obesevacao": obesevacao
  })
}


/**
 * @returns {ModoFacturacao}
 */
async function getAll() {
  return await ModoFacturacao.findAll()
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {ModoFacturacao}
 */
async function getAllByKeyValue(chave, valor) {
  return await ModoFacturacao.findAll({
    where: {
      [chave]: valor
    }
  })
}

module.exports = {
  create,
  getAll,
  getAllByKeyValue,
};
