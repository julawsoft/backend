const { Model, DataTypes, QueryTypes } = require('sequelize');
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

async function removeTarefaByProcesso(id) {
  if(!id)
    throw new Error('ID is required');

  let queryString = `DELETE FROM processo_tarefas WHERE processo_tarefas.id = ${id}`;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.DELETE,
  });

}

async function updateTarefaByProcesso(id, descricao, status) {

  const result = ProcessosTarefas.sequelize.query(`
    UPDATE processo_tarefas
    SET 
      descricao=?,
      status=?
    WHERE id = ? 
  `, {
    replacements: [
      descricao, 
      `${status}`,
      id
    ]
  });

  return (await result);

}

async function getTarefaById(id) {

  let queryString = `SELECT * FROM processo_tarefas WHERE processo_tarefas.id = ${id} limit 1`;

  return  sequelize.query(queryString, {
  type: QueryTypes.SELECT,
  });

}

module.exports = {
  createTarefa,
  getAll,
  getAllByKeyValue,
  removeTarefaByProcesso,
  updateTarefaByProcesso,
  getTarefaById
};
