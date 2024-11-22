const { Model, DataTypes, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessoFacturas extends Model {
  static associate(models) {}
}

ProcessoFacturas.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    processo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "processos",
        key: "id"
      }
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id"
      }
    },
    colaborador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "colaboradores",
        key: "id"
      }
    },
    processos_timesheet_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "processos_timesheet",
        key: "id"
      }
    },
    horas: {
      allowNull: true,
      type: DataTypes.STRING
    },
    custo: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.ENUM("pendente", "pago"),
      defaultValue: "pendente"
    }
  },
  {
    sequelize,
    modelName: "ProcessoFacturas",
    tableName: "processo_facturas",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

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
 * @param {string} horasMes
 * @param {string} valorTotal
 * @param {string} dataEmissaoFactura
 * @returns {Processos}
 */
async function create({
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
  statusId,
  horasMes,
  valorTotal,
  dataEmissaoFactura
}) {
  return Processos.create({
    assunto: assunto,
    area: area,
    fase: fase,
    instituicao_id: instituicaoId,
    modo_facturacao_id: modoFacturacaoId,
    cliente_id: clienteId,
    gestor_id: gestorId,
    contra_parte: contraParte,
    data_registo: dataRegisto,
    data_suspensao: dataSuspensao,
    colaborador_id_suspendeu: colaboradorIdSuspendeu,
    data_encerramento: dataEncerramento,
    colaborador_id_encerrou: colaboradorIdEnderrou,
    metodologia: metodologia,
    estrategia: estrategia,
    factos: factos,
    objectivos: objectivos,
    dados_importantes: dataImportantes,
    status_id: statusId,
    horas_mes: horasMes,
    valor_total: valorTotal,
    data_emissao_factura: dataEmissaoFactura
  });
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

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
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

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

async function getProcessoFacturasByClienteId(idCliente) {
  // return await Processos.findAll()
  let queryString = `SELECT
	  p.*,
    pf.horas,
    pf.custo,
    pf.status,
    pf.created_at as data_registo_factura,
	  c.nome_completo AS colaborador,
	  cli.denominacao AS cliente,
    ps.descricao AS estado_processo,
    pt.data_inicio,
    pt.data_fim,
    pf.created_at AS data_registo
  FROM
    processo_facturas pf
    inner JOIN processos p ON pf.processo_id = p.id
    inner JOIN processo_estado ps ON p.status_id = ps.id
    INNER JOIN clientes cli ON pf.cliente_id = cli.id
	  LEFT JOIN colaboradores c ON pf.colaborador_id = c.id
	  LEFT JOIN processos_timesheet pt ON pf.processos_timesheet_id = pt.id     
  WHERE p.cliente_id = ${idCliente}
  order BY
  pf.created_at desc`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

module.exports = {
  create,
  getAll,
  getById,
  getProcessoFacturasByClienteId
};
