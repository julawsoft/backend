const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class TipoEventoTimeSheet extends Model {
  static associate(models) { }
}

TipoEventoTimeSheet.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },  
  label: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'TipoEventoTimeSheet',
  tableName: 'tipo_eventos_timesheet',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @param {string} label
 * @param {string} descricao
 * @returns {TipoEventoTimeSheet}
*/
async function create(data) {
  return TipoEventoTimeSheet.create(
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

  return  sequelize.query(queryString, {
  type: QueryTypes.SELECT,
});
}



module.exports = {
  TipoEventoTimeSheet,
  create, 
  getAllOrById,
};
