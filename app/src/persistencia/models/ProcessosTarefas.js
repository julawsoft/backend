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
  colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  gestor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data_realizada: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_aprovada: {
    type: DataTypes.STRING,
    allowNull: true,
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
    status = '0',
    data_para_realizacao,
    colaborador_id
  }
) {

  console.log("data realizacao tarefa ... ", descricao )
  console.log("data realizacao tarefa ... processo_id ", processo_id )
  console.log("data realizacao tarefa ... ", data_para_realizacao )
  console.log("data realizacao tarefa ... ", colaborador_id )

  return await ProcessosTarefas.create({
    descricao, processo_id, status, data_para_realizacao, colaborador_id
  })
}


/**
 * @returns {ProcessosTarefas}
 */
async function getAll() {
  return await ProcessosTarefas.findAll()
}

// here ...
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

async function updateTarefaByProcesso(id, processo_id, descricao, data = new Date()) {

  const result = ProcessosTarefas.sequelize.query(`
    UPDATE processo_tarefas
    SET 
      descricao=?,
      processo_id=?,
      data_para_realizacao=?
    WHERE id = ? 
  `, {
    replacements: [
      descricao,
      processo_id,
      data,
      id
    ]
  });

  return (await result);

}

async function getTarefaById(id) {
   
  return ProcessosTarefas.sequelize.query(
  `SELECT 
  pt.id, 
   p.ref,
   pt.descricao,
  pt.processo_id, 
  p.assunto, 
  p.gestor_id, 
  cl.nome_completo,
    DATEDIFF(pt.data_para_realizacao, CURDATE()) as dias_em_falta,
     CASE 
      WHEN pt.status = '0' THEN 'Criada'
      WHEN pt.status = '1' THEN 'Realizada'
      ELSE 'Aprovada'
    END AS estado,
    ges.nome_completo AS gestor,
    DATE_FORMAT(pt.created_at, '%d/%m/%Y') AS data_criada,
    DATE_FORMAT(pt.data_para_realizacao, '%d/%m/%Y') AS data_para_realizacao,
    DATE_FORMAT(pt.data_realizada, '%d/%m/%Y') AS data_realizada,
    DATE_FORMAT(pt.data_aprovada, '%d/%m/%Y') AS data_aprovada
    FROM
      processo_tarefas as pt
      INNER JOIN processos as p ON pt.processo_id = p.id
      INNER JOIN processo_equipa as pe ON p.id = pe.processo_id
      INNER JOIN colaboradores as cl ON pe.colaborador_id = cl.id
      LEFT JOIN colaboradores AS ges ON pt.gestor_id = ges.id
    WHERE
      pt.id = ?
  `,
  {
    replacements: [id],
    type: QueryTypes.SELECT
  })

}

async function getTarefaByColaboradorId(id, status = '0') {

  return ProcessosTarefas.sequelize.query(
    `
      SELECT pt.descricao, pt.data_para_realizacao, pt.processo_id, p.assunto, p.gestor_id, cl.id, 
      DATEDIFF(pt.data_para_realizacao, CURDATE()) as dias_em_falta
      FROM
        processo_tarefas as pt
        INNER JOIN processos as p ON pt.processo_id = p.id
        INNER JOIN colaboradores as cl ON pt.colaborador_id = cl.id
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


async function getTarefaByColaboradorGestorId(id, status = '1') {
  return ProcessosTarefas.sequelize.query(
    `SELECT pt.descricao, pt.data_para_realizacao, pt.processo_id, p.assunto, p.gestor_id, cl.id, 
      DATEDIFF(pt.data_para_realizacao, CURDATE()) as dias_em_falta
      FROM
        processo_tarefas as pt
        INNER JOIN processos as p ON pt.processo_id = p.id
        INNER JOIN colaboradores as cl ON pt.colaborador_id = cl.id
      WHERE
        pt.status = ? AND
        p.gestor_id = ?
    `,
    {
      replacements: [status, id],
      type: QueryTypes.SELECT
    }
  );

}


async function getAllTarefaByColaboradorId(id) {

  return ProcessosTarefas.sequelize.query(
    `SELECT 
     pt.id,
 		p.ref,
 		pt.descricao,
		pt.processo_id, 
		p.assunto, 
		p.gestor_id,  
		cl.nome_completo,
      DATEDIFF(pt.data_para_realizacao, CURDATE()) as dias_em_falta,
     	CASE 
        WHEN pt.status = '0' THEN 'Criada'
        WHEN pt.status = '1' THEN 'Realizada'
        ELSE 'Aprovada'
    	END AS estado,
    	ges.nome_completo AS gestor,
    	DATE_FORMAT(pt.created_at, '%d/%m/%Y') AS data_criada,
    	DATE_FORMAT(pt.data_para_realizacao, '%d/%m/%Y') AS data_para_realizacao,
    	DATE_FORMAT(pt.data_realizada, '%d/%m/%Y') AS data_realizada,
    	DATE_FORMAT(pt.data_aprovada, '%d/%m/%Y') AS data_aprovada
      FROM
        processo_tarefas as pt
        INNER JOIN processos as p ON pt.processo_id = p.id
        INNER JOIN colaboradores as cl ON pt.colaborador_id = cl.id
        LEFT JOIN colaboradores AS ges ON pt.gestor_id = ges.id
      WHERE
        pt.colaborador_id = ?
    `,
    {
      replacements: [id],
      type: QueryTypes.SELECT
    }
  );

}

async function getAllTarefaByProcessoId(id) {

  return ProcessosTarefas.sequelize.query(
    `SELECT 
    pt.id, 
 		p.ref,
 		pt.descricao,
		pt.processo_id, 
		p.assunto, 
		p.gestor_id, 
		cl.nome_completo,
      DATEDIFF(pt.data_para_realizacao, CURDATE()) as dias_em_falta,
     	CASE 
        WHEN pt.status = '0' THEN 'Criada'
        WHEN pt.status = '1' THEN 'Realizada'
        ELSE 'Aprovada'
    	END AS estado,
    	ges.nome_completo AS gestor,
    	DATE_FORMAT(pt.created_at, '%d/%m/%Y') AS data_criada,
    	DATE_FORMAT(pt.data_para_realizacao, '%d/%m/%Y') AS data_para_realizacao,
    	DATE_FORMAT(pt.data_realizada, '%d/%m/%Y') AS data_realizada,
    	DATE_FORMAT(pt.data_aprovada, '%d/%m/%Y') AS data_aprovada
      FROM
        processo_tarefas as pt
        INNER JOIN processos as p ON pt.processo_id = p.id
        INNER JOIN colaboradores as cl ON pt.colaborador_id = cl.id
        LEFT JOIN colaboradores AS ges ON pt.gestor_id = ges.id
      WHERE
        p.id = ?
    `,
    {
      replacements: [id],
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



async function concluirTarefa(id, gestorId, status, dataAprovada) {

  const result = ProcessosTarefas.sequelize.query(`
    UPDATE processo_tarefas
    SET 
      gestor_id=?,
      status=?,
      data_aprovada=?
    WHERE id = ? 
  `, {
    replacements: [
      gestorId,
      `${status}`,
      dataAprovada,
      id
    ]
  });

  return (await result);

}

async function realizarTarefa(id, colaboradorId, status, dataRealizada) {

  console.log(id, colaboradorId, status, dataRealizada)

  const result = ProcessosTarefas.sequelize.query(`
    UPDATE processo_tarefas
    SET 
      colaborador_id=?,
      status=?,
      data_realizada=?
    WHERE id = ? 
  `, {
    replacements: [
      colaboradorId,
      `${status}`,
      dataRealizada,
      id
    ]
  });

  return (await result);

}



module.exports = {
  createTarefa,
  getAll,
  getAllByKeyValue,
  removeTarefaByProcesso,
  updateTarefaByProcesso,
  getTarefaById,
  getTarefaByColaboradorId,
  getRefAndIDList,
  getAllTarefaByColaboradorId,
  getAllTarefaByProcessoId,
  concluirTarefa,
  realizarTarefa,
  getTarefaByColaboradorGestorId
};
