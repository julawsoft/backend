const { Model, DataTypes, QueryTypes, and, where } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessosTimeSheet extends Model {
  static associate(models) { }
}

ProcessosTimeSheet.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  tipo_evento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'tipos_tarefas',
      key: 'id',
    },
  },
  colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'colaboradores',
      key: 'id',
    },
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'clientes',
      key: 'id',
    },
  },
  processo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'processos',
      key: 'id',
    },
  },
  modo_facturacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taxa_processo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  taxa_colaborador: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dados_importantes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_inicio: {
    allowNull: false,
    type: DataTypes.DATE
  },
  data_fim: {
    allowNull: false,
    type: DataTypes.DATE
  },
  horas: {
    allowNull: false,
    type: DataTypes.STRING
  },
  tarefa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'processo_tarefas',
      key: 'id',
    },
  },
  // Novos campos da migration
  user_submetido: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'colaboradores',
      key: 'id',
    },
  },

  user_aprovado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'colaboradores',
      key: 'id',
    },
  },

  user_rejeitado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'colaboradores',
      key: 'id',
    },
  },

  user_faturado: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'colaboradores',
      key: 'id',
    },
  },

  status: {
    type: DataTypes.ENUM('rascunho', 'submetido', 'aprovado', 'rejeitado', 'faturado'),
    allowNull: false,
    defaultValue: 'rascunho',
  },

  notas: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  data_submetido: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  data_aprovado: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  data_rejeitado: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  data_faturado: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ProcessosTimeSheet',
  tableName: 'processos_timesheet',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @param {number} tipo_evento_id
 * @param {number} colaborador_id
 * @param {number} cliente_id
 * @param {number} processo_id
 * @param {string} modo_facturacao
 * @param {string} taxa_processo
 * @param {string} taxa_colaborador
 * @param {string} descricao
 * @param {string} dados_importantes
 * @param {string} data_inicio
 * @param {string} horas
 * @returns {ProcessosTimeSheet}
*/
async function create(data) {
  return ProcessosTimeSheet.create(
    { ...data }
  )
}


async function getAllOrById(id = null) {

  let where = id == null ? '' : 'where p.id = ' + id;

  let queryString = `SELECT 
  p.dados_importantes,
  p.data_inicio,
  p.data_fim,
  p.horas,
  te.label AS tipo_evento,
  p_facturacao.descricao AS modo_facturacao,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador
  
  FROM processos_timesheet p
    
  INNER JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN tipos_tarefas te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id ${where}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}

async function getAllOrByProcessoId(idProcesso) {

  let queryString = `SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id,
  p.dados_importantes,
  DATE_FORMAT(p.data_inicio, '%d/%m/%Y %H:%i:%s') AS data_inicio,
  DATE_FORMAT(p.data_fim, '%d/%m/%Y %H:%i:%s') AS data_fim,
  p.horas,
  p.descricao,
  te.label AS tipo_evento,
  p_facturacao.descricao AS modo_facturacao,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador,
  DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS data_registo
  
  FROM processos_timesheet p
    
  inner join processos pr 
  on pr.id = p.processo_id 
  left JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN tipos_tarefas te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id 
  where p.processo_id = ${idProcesso}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}

async function getById(idProcessoTimeSheet) {

  let queryString = `SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id,
  p.dados_importantes,
  DATE_FORMAT(p.data_inicio, '%d/%m/%Y %H:%i:%s') AS data_inicio,
  DATE_FORMAT(p.data_fim, '%d/%m/%Y %H:%i:%s') AS data_fim,
  p.horas,
  p.descricao,
  te.label AS tipo_evento,
  p_facturacao.descricao AS modo_facturacao,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador,
  DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS data_registo
  
  FROM processos_timesheet p
    
  inner join processos pr 
  on pr.id = p.processo_id 
  left JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN tipos_tarefas te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id 
  where p.id = ${idProcessoTimeSheet}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}

async function getTimeSheetNaoFacturado(idProcesso = undefined, idUser = undefined) {

  let andWhere = '';
  if (idUser != "")
    andWhere += ` and p.colaborador_id = ${idUser}`;
  if (idProcesso != "")
    andWhere += ` and p.processo_id = ${idProcesso}`;

  let queryString = `
  SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id as processoId,
  p.dados_importantes,
  p.data_inicio,
  p.data_fim,
  p.horas,
  p.descricao,
  te.label AS tipo_evento,
  p_facturacao.descricao AS modo_facturacao,
  cli.id AS clienteId,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador
  
  FROM processos_timesheet p
    
  inner join processos pr 
  on pr.id = p.processo_id 
  left JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN tipos_tarefas te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id 
  where p.id NOT IN (SELECT processos_timesheet_id FROM processo_factura_items WHERE processo_factura_items.processos_timesheet_id = p.id)
  ${andWhere}
  `

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}

async function getAllOrByProcessoIdAndColaboradorId(idProcesso, idColaborador) {

  let queryString = `SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id,
  p.dados_importantes,
  p.data_inicio,
  p.data_fim,
  p.horas,
  p.descricao,
  te.label AS tipo_evento,
  p_facturacao.descricao AS modo_facturacao,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador
  
  FROM processos_timesheet p
    
  inner join processos pr 
  on pr.id = p.processo_id 
  left JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN tipos_tarefas te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id 
  where 
  p.processo_id = ${idProcesso}
  and
  p.colaborador_id = ${idColaborador}`
    ;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}

async function updateProcessoTimeSheet(data, idProcessoTimeSheet) {

  return ProcessosTimeSheet.update(
    { ...data },
    {
      where: { "id": idProcessoTimeSheet }
    }
  )
}

async function removeProcessoTimeSheet(idProcessoTimeSheet) {

  if (!idProcessoTimeSheet)
    throw new Error('ID is required');

  let queryString = `DELETE FROM processos_timesheet WHERE processos_timesheet.id = ${idProcessoTimeSheet}`;

  return sequelize.query(queryString, {
    type: QueryTypes.DELETE,
  });

}

/*
async function getAllTimeSheets(colaboradorId) {

  let where = colaboradorId == null ? '' : 'where p.colaborador_id = ' + colaboradorId;

  let queryString = `SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id,
  p.dados_importantes,
  DATE_FORMAT(p.data_inicio, '%d/%m/%Y %H:%i:%s') AS data_inicio,
  DATE_FORMAT(p.data_fim, '%d/%m/%Y %H:%i:%s') AS data_fim,
  p.horas,
  p.descricao,
  p.colaborador_id,
  t.descricao AS tarefa,
  p_facturacao.descricao AS modo_facturacao,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador,
  cli.id as clienteId,
  pr.id as processoId,
  t.id as tarefaId,
  DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS data_registo,
  p.status,
  p.notas

  FROM processos_timesheet p
    
  inner join processos pr 
  on pr.id = p.processo_id 
  left JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN processo_tarefas t 
  ON t.id = p.tarefa_id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id
  ${where}
  `;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}
*/

async function getAllTimeSheets({
  colaboradorId,
  clienteId,
  processoId,
  tarefaId,
  dataInicio,
  dataFim,
  statusId,
}) {

  let query = `
    SELECT 
      pr.ref AS referencia_processo,
      pr.assunto AS assunto_processo,
      p.id,
      p.dados_importantes,
      DATE_FORMAT(p.data_inicio, '%d/%m/%Y %H:%i:%s') AS data_inicio,
      DATE_FORMAT(p.data_fim, '%d/%m/%Y %H:%i:%s') AS data_fim,
      p.horas,
      p.descricao,
      p.colaborador_id,
      t.descricao AS tarefa,
      p_facturacao.descricao AS modo_facturacao,
      cli.denominacao AS cliente,
      tcli.description AS tipo_cliente,
      c.nome_completo AS colaborador,
      c.taxa_horaria as colaboradorTaxa,
      cli.id AS cliente_id,
      pr.id AS processo_id,
      t.id AS tarefa_id,
      DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS data_registo,
      p.status,
      p.notas
    FROM processos_timesheet AS p
      INNER JOIN processo_tarefas AS t ON t.id = p.tarefa_id
      LEFT JOIN processos AS pr ON pr.id = t.processo_id
      LEFT JOIN processo_facturacao AS p_facturacao ON p.modo_facturacao = p_facturacao.id
      LEFT JOIN colaboradores AS c ON p.colaborador_id = c.id
      LEFT JOIN clientes AS cli ON t.cliente_id = cli.id
      LEFT JOIN tipo_cliente AS tcli ON cli.tipo_id = tcli.id
    WHERE 1=1
  `;

  const replacements = [];

  // Filtros dinâmicos
  if (colaboradorId && colaboradorId != 'undefined') {
    query += " AND p.colaborador_id = ? ";
    replacements.push(colaboradorId);
  }

  if (clienteId && clienteId != 'undefined') {
    query += " AND t.cliente_id = ? ";
    replacements.push(clienteId);
  }

  if (processoId && processoId != 'undefined') {
    query += " AND t.processo_id = ? ";
    replacements.push(processoId);
  }

  if (tarefaId && tarefaId != 'undefined') {
    query += " AND p.tarefa_id = ? ";
    replacements.push(tarefaId);
  }

  if (statusId && statusId != 'undefined') {
    query += " AND p.status = ? ";
    replacements.push(statusId);
  }

  if (dataInicio && dataFim) {
    query += " AND left(p.data_inicio,10) BETWEEN ? AND ? ";
    replacements.push(dataInicio, dataFim);
  }

  query += " ORDER BY p.data_inicio DESC";

  const results = await ProcessosTimeSheet.sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return results;
}


async function getAllByClienteId(idCliente) {

  let where = idCliente == null ? '' : 'where p.cliente_id = ' + idCliente;

  let queryString = `SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id,
  p.dados_importantes,
  DATE_FORMAT(p.data_inicio, '%d/%m/%Y %H:%i:%s') AS data_inicio,
  DATE_FORMAT(p.data_fim, '%d/%m/%Y %H:%i:%s') AS data_fim,
  p.horas,
  p.descricao,
  p.colaborador_id,
  t.descricao AS tarefa,
  p_facturacao.descricao AS modo_facturacao,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente,
  c.nome_completo AS colaborador,
  DATE_FORMAT(p.created_at, '%d/%m/%Y %H:%i:%s') AS data_registo
  
  FROM processos_timesheet p
    
  inner join processos pr 
  on pr.id = p.processo_id 
  left JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao = p_facturacao.id
  INNER JOIN processo_tarefas t ON t.id = p.tarefa_id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id 
  ${where}
  `;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}


async function getTotalTarefas(year = undefined, idUser = undefined) {

  let defaultDate = year ?? new Date().getFullYear()

  let andWhere = `where YEAR(pt.data_inicio) = ${defaultDate}`;
  if (idUser != "" && idUser != undefined)
    andWhere += ` and c.id = ${idUser}`;

  let queryString = `
  SELECT 
    t.descricao AS Tarefa,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 1 THEN pt.horas ELSE 0 END), 2) AS Janeiro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 2 THEN pt.horas ELSE 0 END), 2) AS Fevereiro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 3 THEN pt.horas ELSE 0 END), 2) AS Março,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 4 THEN pt.horas ELSE 0 END), 2) AS Abril,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 5 THEN pt.horas ELSE 0 END), 2) AS Maio,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 6 THEN pt.horas ELSE 0 END), 2) AS Junho,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 7 THEN pt.horas ELSE 0 END), 2) AS Julho,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 8 THEN pt.horas ELSE 0 END), 2) AS Agosto,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 9 THEN pt.horas ELSE 0 END), 2) AS Setembro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 10 THEN pt.horas ELSE 0 END), 2) AS Outubro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 11 THEN pt.horas ELSE 0 END), 2) AS Novembro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 12 THEN pt.horas ELSE 0 END), 2) AS Dezembro,
    ROUND(SUM(pt.horas), 2) AS Total
FROM processos_timesheet pt
INNER JOIN processo_tarefas t ON t.id = pt.tarefa_id
INNER JOIN colaboradores c ON c.id = pt.colaborador_id
${andWhere}
GROUP BY t.descricao
ORDER BY t.descricao;
  `
  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}

async function getTotalProjectos(year = undefined, idUser = undefined) {

  let defaultDate = year ?? new Date().getFullYear()

  let andWhere = `where YEAR(pt.data_inicio) = ${defaultDate}`;
  if (idUser != "" && idUser != undefined)
    andWhere += ` and c.id = ${idUser}`;

  let queryString = `
  SELECT 
    p.ref AS processo_referencia,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 1 THEN pt.horas ELSE 0 END), 2) AS Janeiro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 2 THEN pt.horas ELSE 0 END), 2) AS Fevereiro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 3 THEN pt.horas ELSE 0 END), 2) AS Março,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 4 THEN pt.horas ELSE 0 END), 2) AS Abril,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 5 THEN pt.horas ELSE 0 END), 2) AS Maio,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 6 THEN pt.horas ELSE 0 END), 2) AS Junho,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 7 THEN pt.horas ELSE 0 END), 2) AS Julho,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 8 THEN pt.horas ELSE 0 END), 2) AS Agosto,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 9 THEN pt.horas ELSE 0 END), 2) AS Setembro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 10 THEN pt.horas ELSE 0 END), 2) AS Outubro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 11 THEN pt.horas ELSE 0 END), 2) AS Novembro,
    ROUND(SUM(CASE WHEN MONTH(pt.data_inicio) = 12 THEN pt.horas ELSE 0 END), 2) AS Dezembro,
    ROUND(SUM(pt.horas), 2) AS Total
FROM processos_timesheet pt
-- INNER JOIN tipo_eventos_timesheet te ON te.id = pt.tipo_evento_id
INNER JOIN processos p ON p.id = pt.processo_id
INNER JOIN colaboradores c ON c.id = pt.colaborador_id
${andWhere}
GROUP BY p.ref
ORDER BY p.ref;
  `
  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}


async function submeterTimeSheet(id, status, data = new Date()) {

  const result = ProcessosTimeSheet.sequelize.query(`
    UPDATE processos_timesheet
    SET 
      status=?,
      data_submetido=?
    WHERE id = ? 
  `, {
    replacements: [
      status,
      data,
      id
    ]
  });

  return (await result);

}

module.exports = {
  ProcessosTimeSheet,
  create,
  getAllOrById,
  getAllOrByProcessoId,
  getAllOrByProcessoIdAndColaboradorId,
  updateProcessoTimeSheet,
  removeProcessoTimeSheet,
  getTimeSheetNaoFacturado,
  getAllTimeSheets,
  getAllByClienteId,
  getById,
  getTotalTarefas,
  getTotalProjectos,
  submeterTimeSheet
};
