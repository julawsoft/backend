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
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipo_tarefa_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data_para_realizacao: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('0', '1', '2'),
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
async function create(
  {
    processoId,
    descricao,
    clienteId,
    status,
    dataParaRealizacao,
    colaboradorId,
    gestorId,
    tipoTarefaId
  }
) {

  return await ProcessosTarefas.create({
    "processo_id": processoId,
    "descricao": descricao,
    "cliente_id": clienteId,
    "status": status,
    "data_para_realizacao": dataParaRealizacao,
    "colaborador_id": colaboradorId,
    "gestor_id": gestorId,
    "tipo_tarefa_id": tipoTarefaId,
    "created_at": new Date(),
    "updated_at": new Date(),
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

async function getAllTasks(
  {
    colaboradorId,
    processoId,
    clienteId,
    statusId,
    dataInicio,
    dataFim,
    tipoTarefa
  }) {
  let query = `
    SELECT 
      pt.id, 
      p.ref,
      pt.descricao,
      pt.processo_id, 
      p.assunto, 
      p.gestor_id, 
      cl.nome_completo AS colaborador,
      cl.id as colaborador_id,
      c.id as cliente_id,
      tt.id as tipo_tarefa_id,
      pt.status as status_id,
      DATEDIFF(pt.data_para_realizacao, CURDATE()) AS dias_em_falta,
      CASE 
      WHEN pt.status = '0' THEN 'Criada'
      WHEN pt.status = '1' THEN 'Em Progresso'
      ELSE 'Concluída'
      END AS estado,
      ges.nome_completo AS gestor,
      c.denominacao AS cliente,
      tt.label AS tipoTarefa,
      DATE_FORMAT(pt.created_at, '%d/%m/%Y %H:%i:%s') AS data_criada,
      DATE_FORMAT(pt.data_para_realizacao, '%d/%m/%Y %H:%i:%s') AS data_para_realizacao,
      DATE_FORMAT(pt.data_realizada, '%d/%m/%Y %H:%i:%s') AS data_realizada,
      DATE_FORMAT(pt.data_aprovada, '%d/%m/%Y %H:%i:%s') AS data_aprovada
    FROM processo_tarefas AS pt
      INNER JOIN processos AS p ON pt.processo_id = p.id
      INNER JOIN colaboradores AS cl ON pt.colaborador_id = cl.id
      LEFT JOIN colaboradores AS ges ON pt.gestor_id = ges.id
      LEFT JOIN clientes AS c ON p.cliente_id = c.id
      LEFT JOIN tipos_tarefas tt ON pt.tipo_tarefa_id = tt.id
    WHERE 1=1
  `;

  const replacements = [];

  if (colaboradorId) {
    query += " AND pt.colaborador_id = ? ";
    replacements.push(colaboradorId);
  }
  if (processoId && processoId != 'undefined') {
    query += " AND pt.processo_id = ? ";
    replacements.push(processoId);
  }
  if (clienteId && clienteId != 'undefined') {
    query += " AND p.cliente_id = ? ";
    replacements.push(clienteId);
  }
  if (statusId && statusId != 'undefined') {
    query += " AND pt.status = ? ";
    replacements.push(statusId);
  }
  if (tipoTarefa && tipoTarefa != 'undefined') {
    query += " AND pt.tipo_tarefa_id = ? ";
    replacements.push(tipoTarefa);
  }
  if (dataInicio && dataFim) {
    query += " AND pt.data_para_realizacao BETWEEN ? AND ? ";
    replacements.push(dataInicio, dataFim);
  }

  query += " ORDER BY pt.data_para_realizacao ASC";

  const results = await ProcessosTarefas.sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return results;
}


async function getByIdTask(
  taskId
  ) {
  let query = `
    SELECT 
    pt.id, 
    p.ref,
    pt.descricao,
    pt.processo_id, 
    p.assunto, 
    p.gestor_id, 
    cl.nome_completo AS colaborador,
    cl.id as colaborador_id,
    c.id as cliente_id,
    tt.id as tipo_tarefa_id,
    pt.status as status_id,
    DATEDIFF(pt.data_para_realizacao, CURDATE()) AS dias_em_falta,
    CASE 
    WHEN pt.status = '0' THEN 'Criada'
    WHEN pt.status = '1' THEN 'Em Progresso'
    ELSE 'Concluída'
    END AS estado,
    ges.nome_completo AS gestor,
    c.denominacao AS cliente,
    tt.label AS tipoTarefa,
      DATEDIFF(pt.data_para_realizacao, CURDATE()) AS dias_em_falta,
      CASE 
      WHEN pt.status = '0' THEN 'Criada'
      WHEN pt.status = '1' THEN 'Em Progresso'
      ELSE 'Concluída'
      END AS estado,
      ges.nome_completo AS gestor,
      c.denominacao AS cliente,
      tt.label AS tipoTarefa,
      DATE_FORMAT(pt.created_at, '%d/%m/%Y %H:%i:%s') AS data_criada,
      DATE_FORMAT(pt.data_para_realizacao, '%d/%m/%Y %H:%i:%s') AS data_para_realizacao,
      DATE_FORMAT(pt.data_realizada, '%d/%m/%Y %H:%i:%s') AS data_realizada,
      DATE_FORMAT(pt.data_aprovada, '%d/%m/%Y %H:%i:%s') AS data_aprovada
    FROM processo_tarefas AS pt
      INNER JOIN processos AS p ON pt.processo_id = p.id
      INNER JOIN colaboradores AS cl ON pt.colaborador_id = cl.id
      LEFT JOIN colaboradores AS ges ON pt.gestor_id = ges.id
      LEFT JOIN clientes AS c ON p.cliente_id = c.id
      LEFT JOIN tipos_tarefas tt ON pt.tipo_tarefa_id = tt.id
    WHERE 1=1
  `;

  const replacements = [];
  if (taskId) {
    query += " AND pt.id = ? ";
    replacements.push(taskId);
    }
  /*
  if (processoId) {
    query += " AND pt.processo_id = ? ";
    replacements.push(processoId);
  }
  if (clienteId) {
    query += " AND p.cliente_id = ? ";
    replacements.push(clienteId);
  }
  if (statusId) {
    query += " AND pt.status = ? ";
    replacements.push(statusId);
  }
  if (dataInicio && dataFim) {
    query += " AND pt.data_para_realizacao BETWEEN ? AND ? ";
    replacements.push(dataInicio, dataFim);
  }

  query += " ORDER BY pt.data_para_realizacao ASC";
  */

  const results = await ProcessosTarefas.sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return results;
}

/**
 * Atualiza uma tarefa pelo ID.
 * @param {number} id 
 * @param {Object} fields - Campos a atualizar, ex: { descricao: "nova", status: "1", data_para_realizacao: new Date() }
 * @returns {Promise<[number, ProcessosTarefas[]]>} 
 */
async function updateTask(id, fields) {

  if (!id) throw new Error('ID da tarefa é obrigatório');
  if (!fields || Object.keys(fields).length === 0) throw new Error('Nenhum campo para atualizar');

  fields.updated_at = new Date();

   const [affectedRows] = await ProcessosTarefas.update(fields, {
    where: { id }
  });

  if (affectedRows === 0) {
    throw new Error('Nenhuma tarefa encontrada para atualizar');
  }

  const updatedTask = await ProcessosTarefas.findByPk(id);
  return updatedTask;

}

/**
 * Remove uma tarefa pelo ID
 * @param {number} id - ID da tarefa a ser removida
 * @returns {Promise<boolean>} true se a tarefa foi removida, false caso não exista
 */
async function removeTask(id) {
  if (!id) throw new Error('ID da tarefa é obrigatório');

  const deletedRows = await ProcessosTarefas.destroy({
    where: { id }
  });

  return deletedRows > 0; // true se removeu, false se não encontrou
}


/**
 * Atualiza parcialmente uma tarefa (PATCH)
 * @param {number} id - ID da tarefa a ser atualizada
 * @param {Object} fields - Campos que podem ser atualizados: status, data_realizada, data_aprovada
 * @returns {Promise<ProcessosTarefas>} Tarefa atualizada
 */
async function patchTask(id, fields) {
  if (!id) throw new Error('ID da tarefa é obrigatório');

  // Permitir apenas os campos específicos
  const allowedFields = ['status', 'data_realizada', 'data_aprovada', 'gestor_id', 'colaborador_id'];
  const updateData = {};

  for (const key of allowedFields) {
    if (fields[key] !== undefined) {
      updateData[key] = fields[key];
    }
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error('Nenhum campo válido para atualizar');
  }

  updateData.updated_at = new Date();

  const [affectedRows] = await ProcessosTarefas.update(updateData, {
    where: { id }
  });

  if (affectedRows === 0) {
    throw new Error('Tarefa não encontrada');
  }

  // Retorna a tarefa atualizada
  const updatedTask = await ProcessosTarefas.findByPk(id);
  return updatedTask;
}



module.exports = {
  create,
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
  getTarefaByColaboradorGestorId,
  getAllTasks,
  getByIdTask,
  updateTask,
  removeTask,
  patchTask
};
