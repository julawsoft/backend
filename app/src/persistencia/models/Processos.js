const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Processos extends Model {
  static associate(models) { }
}

Processos.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  assunto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fase: {
    type: DataTypes.ENUM('Extrajudicial', 'Judicial'),
    allowNull: false,
  },
  instituicao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  modo_facturacao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cliente_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  gestor_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  contra_parte: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  data_registo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_suspensao: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  colaborador_id_suspendeu: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  data_encerramento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  colaborador_id_encerrou: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  metodologia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  estrategia: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  factos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  objectivos: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  dados_importantes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'Processos',
  tableName: 'processos',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});



/**
 * @param {string} assunto 
 * @param {string} area 
 * @param {string} fase 
 * @param {number} instituicaoId 
 * @param {number} modoFacturacaoId 
 * @param {number} clienteId
 * @param {number} gestorId 
 * @param {string} contraParte 
 * @param {string} dataRegisto 
 * @param {string} dataSuspensao 
 * @param {string} colaboradorIdSuspendeu 
 * @param {string} dataEncerramento 
 * @param {string} colaboradorIdEnderrou 
 * @param {string} metodologia 
 * @param {string} estrategia 
 * @param {string} factos 
 * @param {string} objectivos 
 * @param {string} dataImportantes 
 * @returns {Processos}
 */
async function create(
  {
    assunto,
    area,
    fase,
    instituicaoId,
    modoFacturacaoId,
    clienteId,
    gestorId,
    contraParte,
    dataRegisto,
    dataSuspensao,
    colaboradorIdSuspendeu,
    dataEncerramento,
    colaboradorIdEnderrou,
    metodologia,
    estrategia,
    factos,
    objectivos,
    dataImportantes,
    statusId
  }
) {
  

  return Processos.create(
    {
      "assunto": assunto,
      "area": area,
      "fase": fase,
      "instituicao_id": instituicaoId,
      "modo_facturacao_id": modoFacturacaoId,
      "cliente_id": clienteId,
      "gestor_id": gestorId,
      "contra_parte": contraParte,
      "data_registo": dataRegisto,
      "data_suspensao": dataSuspensao,
      "colaborador_id_suspendeu": colaboradorIdSuspendeu,
      "data_encerramento": dataEncerramento,
      "colaborador_id_encerrou": colaboradorIdEnderrou,
      "metodologia": metodologia,
      "estrategia": estrategia,
      "factos": factos,
      "objectivos": objectivos,
      "dados_importantes": dataImportantes,
      "status_id": statusId
    }
  )
}


/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  return await Processos.findAll({
    where: {
      [chave]: valor
    }
  })
}


async function getAll() {
  // return await Processos.findAll() 
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


async function getById(id) {
  // return await Processos.findAll() 
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
  ON cli.tipo_id = tcli.id
  where p.id = ${id}
  `;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.SELECT,
});
}




module.exports = {
  create,
  getAllByKeyValue,
  getAll,
  getById,
};
