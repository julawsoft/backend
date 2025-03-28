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
    allowNull: false,
    references: {
      model: 'tipo_eventos_timesheet',
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
    allowNull: false,
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
  }
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
  INNER JOIN tipo_eventos_timesheet te
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
  INNER JOIN tipo_eventos_timesheet te
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

async function getTimeSheetNaoFacturado(idProcesso) {
  let queryString = `
  SELECT 
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
  INNER JOIN tipo_eventos_timesheet te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id 
  where p.processo_id = ${idProcesso}
  AND p.id NOT IN (SELECT processos_timesheet_id FROM processo_factura_items WHERE processo_factura_items.processos_timesheet_id = p.id)
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
  INNER JOIN tipo_eventos_timesheet te
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
      where: { "id": idProcessoTimeSheet}
    }
  )
}

async function removeProcessoTimeSheet(idProcessoTimeSheet) {

  if(!idProcessoTimeSheet)
    throw new Error('ID is required');

  let queryString = `DELETE FROM processos_timesheet WHERE processos_timesheet.id = ${idProcessoTimeSheet}`;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.DELETE,
  });
  
}

async function getAllTimeSheets() {

  let queryString = `SELECT 
  pr.ref as referencia_processo,
  pr.assunto as assunto_processo,
  p.id,
  p.dados_importantes,
  p.data_inicio,
  p.data_fim,
  p.horas,
  p.descricao,
  p.colaborador_id,
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
  INNER JOIN tipo_eventos_timesheet te
  ON p.tipo_evento_id = te.id
  LEFT JOIN colaboradores c
  ON p.colaborador_id = c.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id `;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
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
  getAllTimeSheets
};
