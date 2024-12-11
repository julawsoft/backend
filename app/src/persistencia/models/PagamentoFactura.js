const { Model, DataTypes, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");
const { ProcessoFacturas } = require("./ProcessoFacturas.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class PagamentoFactura extends Model {
  static associate(models) {
    PagamentoFactura.belongsTo(models.ProcessoFacturas, {
      foreignKey: 'factura_id',
      as: 'factura'
    })
  }
}

PagamentoFactura.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },      
    factura_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'processo_facturas',
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
    modo_pagamento_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'modo_pagamento',
        key: 'id',
      },
    },
    valor_factura: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    valor_pago: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    valor_restante: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    anexo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desconto:{
      type: DataTypes.INTEGER,
      allowNull: true
    },  
    obs: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "PagamentoFactura",
    tableName: "pagamento_factura",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

async function createPagamentoFactura(data) {
  return PagamentoFactura.create({
    "factura_id": data.facturaId,
    "colaborador_id": data.colaboradorId,
    "valor_factura": data.valorFactura,
    "valor_pago": data.valorPago,
    "valor_restante": data.valorRestante,
    "modo_pagamento_id": data.modoPagamentoId,
    "anexo": data.anexo,
    "obs": data.obs,
    "desconto": data.desconto,
  }, 
);
}

async function getPagamentoFactura() {

  let queryString = `SELECT 
	p.*,
	c.nome_completo AS colaborador,
	mp.descricao modo_pagamento
FROM pagamento_factura p

INNER JOIN processo_facturas pf
ON p.factura_id = pf.id
INNER JOIN colaboradores c 
ON p.colaborador_id = c.id
INNER JOIN modo_pagamento mp
ON p.modo_pagamento_id = mp.id`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}


async function getPagamentoByIdFactura(idFactura) {

  let queryString = `SELECT 
	p.*,
	c.nome_completo AS colaborador,
	mp.descricao modo_pagamento
FROM pagamento_factura p

INNER JOIN processo_facturas pf
ON p.factura_id = pf.id
INNER JOIN colaboradores c 
ON p.colaborador_id = c.id
INNER JOIN modo_pagamento mp
ON p.modo_pagamento_id = mp.id
where p.factura_id = ${idFactura}
`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });

}


module.exports = {
  createPagamentoFactura,
  getPagamentoFactura,
  getPagamentoByIdFactura
};
