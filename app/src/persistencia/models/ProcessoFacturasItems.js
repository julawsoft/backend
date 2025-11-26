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
    dados_adicionais: {
      allowNull: true,
      type: DataTypes.STRING
    },
    tipo: {
      allowNull: true,
      type: DataTypes.ENUM("timesheet", "despesa")
    },
    tipo_id: {
      allowNull: true,
      type: DataTypes.INTEGER
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


  console.log("createProcessoFacturaItems data ", data)

  return ProcessoFacturaItems.create({
    "processo_factura_id": data.processoFacturaId,
    "processos_timesheet_id": data.processoTimeSheetId,
    "horas": data.horas,
    "custo": data.custo,
    "dados_adicionais": data.dadosAdicionais,
    "tipo": data.tipo,
    "tipo_id": data.tipo_id,
  });
}

async function getFacturaItemsByFacturaId(idFactura) {
  let queryString = `
  SELECT 
    pfi.*,
    pt.descricao,
    pt.horas,
    t.descricao AS tarefa,
    pt.created_at AS dataRegistoTimeSheet,
    c.nome_completo as colaborador, 
    c.taxa_horaria as colaboradorTaxa,
    DATE_FORMAT(pfi.created_at, '%d/%m/%Y %H:%i') AS data_registo,
    (SELECT td.label FROM despesas d
  INNER JOIN tipos_despesas td
  ON d.tipo_despesa = td.id WHERE d.id = pfi.tipo_id) AS tipoDespesa
    
  FROM 
  processo_factura_items 
  pfi
  
  left join processos_timesheet pt
  ON pt.id = pfi.processos_timesheet_id
  LEFT JOIN colaboradores c 
  ON c.id = pt.colaborador_id
  LEFT join processo_tarefas t
  ON t.id = pt.tarefa_id

  WHERE pfi.processo_factura_id = ${idFactura}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}


module.exports = {
  createProcessoFacturaItems,
  getFacturaItemsByFacturaId
};
