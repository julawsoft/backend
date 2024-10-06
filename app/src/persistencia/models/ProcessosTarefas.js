const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessosTarefas extends Model {
  static associate(models) { }
}

ProcessosTarefas.init({
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
  processo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: false,
    defaultValue: '0',
  },
}, {
  sequelize,
  modelName: 'ProcessosTarefas',
  tableName: 'processo_tarefas',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {string} descricao
* @param {number} processo_id
* @param {string} status
* @returns {ProcessosTarefas}
*/
async function createTarefa(
  {
    descricao,
    processo_id,
    status
  }
) {

  return await ProcessosTarefas.create({
    "descricao": descricao,
    "processo_id": processo_id,
    "status": status
  })
}


/**
 * @returns {ProcessosTarefas}
 */
async function getAll() {
  return await ProcessosTarefas.findAll()
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {ProcessosTarefas}
 */
async function getAllByKeyValue(chave, valor) {
  return await ProcessosTarefas.findAll({
    where: {
      [chave]: valor
    }
  })
}

module.exports = {
  createTarefa,
  getAll,
  getAllByKeyValue,
};
