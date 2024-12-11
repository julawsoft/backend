const { Model, DataTypes, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessoFacturaItems extends Model {
  static associate(models) {}
}

ProcessoFacturaItems.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    processo_factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "processo_facturas",
        key: "id"
      }
    },
    processos_timesheet_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    dados_adicionais: {
      allowNull: true,
      type: DataTypes.STRING
    },
  },
  {
    sequelize,
    modelName: "ProcessoFacturaItems",
    tableName: "processo_factura_items",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

async function createProcessoFacturaItems(data) {
  return ProcessoFacturaItems.create({
    "processo_factura_id": data.processoFacturaId,
    "processos_timesheet_id": data.processoTimeSheetId,
    "horas": data.horas,
    "custo": data.custo,
    "dados_adicionais": data.dadosAdicionais,
  });
}

async function getFacturaItemsByFacturaId(idFactura) {
  let queryString = `SELECT * FROM processo_factura_items pfi
  WHERE pfi.processo_factura_id = ${idFactura}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}


module.exports = {
  createProcessoFacturaItems,
  getFacturaItemsByFacturaId
};
