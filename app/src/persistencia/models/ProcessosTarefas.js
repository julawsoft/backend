const { Model, DataTypes, QueryTypes, Sequelize } = require('sequelize');
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
  data_para_realizacao: {
    type: DataTypes.DATE,
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
    status,
    data_para_realizacao = new Date(),
  }
) {

  return await ProcessosTarefas.create({
    descricao, processo_id, status, data_para_realizacao
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
  if (!id)
    throw new Error('ID is required');

  let queryString = `DELETE FROM processo_tarefas WHERE processo_tarefas.id = ${id}`;

  return sequelize.query(queryString, {
    type: QueryTypes.DELETE,
  });

}

async function updateTarefaByProcesso(id, descricao, status, data = new Date()) {

  const result = ProcessosTarefas.sequelize.query(`
    UPDATE processo_tarefas
    SET 
      descricao=?,
      status=?,
      data_para_realizacao=?
    WHERE id = ? 
  `, {
    replacements: [
      descricao,
      `${status}`,
      data,
      id
    ]
  });

  return (await result);

}

async function getTarefaById(id) {

  let queryString = `SELECT * FROM processo_tarefas WHERE processo_tarefas.id = ${id} limit 1`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}

async function getTarefaByColaboradorId(id, status = '0') {

  return ProcessosTarefas.sequelize.query(
    `
      SELECT pt.descricao, pt.data_para_realizacao, pt.processo_id, p.assunto, p.gestor_id, cl.id, 
      DATEDIFF(pt.data_para_realizacao, CURDATE()) as dias_em_falta
      FROM
        processo_tarefas as pt
        INNER JOIN processos as p ON pt.processo_id = p.id
        INNER JOIN processo_equipa as pe ON p.id = pe.processo_id
        INNER JOIN colaboradores as cl ON pe.colaborador_id = cl.id
      WHERE
        pt.status = ? AND
        cl.id = ?
    `,
    {
      replacements: [status, id],
      type: QueryTypes.SELECT
    }
  );

}

async function getRefAndIDList() {

  return ProcessosTarefas.sequelize.query(
    `
      SELECT id, ref as numero
      FROM
        processos
    `,
    {
      type: QueryTypes.SELECT
    }
  );

}



module.exports = {
  createTarefa,
  getAll,
  getAllByKeyValue,
  removeTarefaByProcesso,
  updateTarefaByProcesso,
  getTarefaById,
  getTarefaByColaboradorId,
  getRefAndIDList
};
