const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * 
 * @class
 */
class ProcessoInstituacao extends Model {
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
}, {
  sequelize,
  modelName: 'ProcessoInstituacao',
  tableName: 'processo_instituicoes',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {string} descricao
* @returns {ProcessoInstituacao}
*/
async function create(
  {
    descricao
  }
) {
  return await ProcessoInstituacao.create({
    "descricao": descricao
  })
}


/**
 * @returns {ProcessoInstituacao}
 */
async function getAll() {
  return await ProcessoInstituacao.findAll()
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {ProcessoInstituacao}
 */
async function getAllByKeyValue(chave, valor) {
  return await ProcessoInstituacao.findAll({
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
