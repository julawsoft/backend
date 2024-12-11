const { Model, DataTypes, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessoFacturas extends Model {
  static associate(models) {
    ProcessoFacturas.hasMany(models.PagamentoFactura, {
      foreignKey: 'factura_id',
      as: 'pagamentos'
    })
  }
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

async function createProcessoFactura(data) {

  return ProcessoFacturas.create({
    "processo_id": data.processoId,
    "cliente_id": data.clienteId,
    "colaborador_id": data.colaboradorId,
    "horas": data.horas,
    "custo": data.custo,
    "status": data.status
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
    pf.created_at AS data_registo,
    pf.id as processo_factura_id
  FROM
    processo_facturas pf
    inner JOIN processos p ON pf.processo_id = p.id
    inner JOIN processo_estado ps ON p.status_id = ps.id
    INNER JOIN clientes cli ON pf.cliente_id = cli.id
	  LEFT JOIN colaboradores c ON pf.colaborador_id = c.id
  WHERE p.cliente_id = ${idCliente}
  order BY
  pf.created_at desc`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

async function getProcessoFacturasById(idProcessoFactura) {
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
  WHERE pf.id = ${idProcessoFactura}
  order BY
  pf.created_at desc`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

module.exports = {
  ProcessoFacturas,
  createProcessoFactura,
  getProcessoFacturasByClienteId,
  getProcessoFacturasById
};
