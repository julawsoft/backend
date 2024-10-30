const { Model, DataTypes, QueryTypes } = require('sequelize');
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
  console.log("here", data);
  return ProcessosTimeSheet.create(
    {...data}
  )
}


async function getAllOrById(id = null) {

  let where = id == null ? '' : 'where';

  let queryString = `SELECT 
  p.*,
  p_status.descricao AS estado,
  p_instituicoes.descricao AS instituicao,
  p_facturacao.descricao AS modo_facturacao,
  c.nome_completo AS gestor,
  c_suspendeu.nome_completo AS colaborador_suspendeu,
  c_enderrou.nome_completo AS colaborador_encerrou,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente
  
  FROM processos p
  
  INNER JOIN processo_estado p_status
  ON p.status_id = p_status.id
  INNER JOIN processo_instituicoes p_instituicoes
  ON p.instituicao_id = p_instituicoes.id
  INNER JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao_id = p_facturacao.id
  LEFT JOIN colaboradores c
  ON p.gestor_id = c.id
  LEFT JOIN colaboradores c_suspendeu
  ON p.colaborador_id_suspendeu = c_suspendeu.id
  LEFT JOIN colaboradores c_enderrou
  ON p.colaborador_id_encerrou = c_enderrou.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}

async function getAllOrByProcessoId(idProcesso) {

  let queryString = ``;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}


module.exports = {
  ProcessosTimeSheet,
  create,
  getAllOrById,
  getAllOrByProcessoId
};
