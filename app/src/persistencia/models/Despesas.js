const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * 
 * @class
 */
class Despesas extends Model {
  static associate(models) { }
}

Despesas.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  idProcesso: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  valor: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tipoMovimento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  tipo_despesa: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dataMovimento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  colaboradorId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Despesas',
  tableName: 'despesas',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {number} idProcesso
* @param {number} colaboradorId
* @param {number} valor
* @param {number} tipoMovimento
* @param {string} dataMovimento
* @returns {Despesas}
*/
async function create(
  {
    colaboradorId, 
    dataMovimento, 
    valor, 
    clienteId,
    tipoDespesaId,
    processoId
  }
) {
  return await Despesas.create({
    "colaboradorId": colaboradorId, 
    "valor": valor, 
    "clienteId": clienteId, 
    "tipo_despesa": tipoDespesaId, 
    "dataMovimento": dataMovimento, 
    "idProcesso": processoId, 
    "tipoMovimento": 1, 
  })
}

/**
 * @returns {Despesas}
 */
async function getAll() {

  const queryString = `
  SELECT
  d.id,
  d.idProcesso,
  FORMAT(d.valor, 2, 'de_DE') AS valor,
  d.tipoMovimento,
  DATE_FORMAT(d.dataMovimento, '%d/%m/%Y %H:%i:%s') AS dataMovimento,
  d.colaboradorId,
  p.ref AS numeroProcesso,
  c.denominacao AS nomeCliente,
  cl.nome_completo AS colaborador,
  tp.label AS tipoDespesasLabel,
  tp.descricao AS tipoDespesas,
  DATE_FORMAT(c.created_at, '%d/%m/%Y') AS criadaEm
FROM
  despesas d
  INNER JOIN processos p ON d.idProcesso = p.id
  INNER JOIN clientes c ON p.cliente_id = c.id
  INNER JOIN tipos_despesas tp ON d.tipo_despesa = tp.id
  INNER JOIN colaboradores cl ON d.colaboradorId = cl.id;

  `;
  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}

/**
 * @returns {Despesas}
 */
async function findAllFilter(
  {
    clienteId,
    processoId
  }
) {

  console.log("clienteId ", clienteId)
  console.log("processoId ", processoId)
  console.log("processoId null", typeof processoId)

  let where = "";

  if ((clienteId != 0) && (processoId == 0))
    where = `where c.id = ${clienteId}`

  if ((clienteId == 0) && (processoId != 0))
    where = `where d.idProcesso = ${processoId}`

  if ((clienteId != 0) && (processoId != 0))
    where = `where c.id = ${clienteId} and d.idProcesso = ${processoId}`

  console.log("O where ", where)

  const queryString = `
    SELECT
    d.id,
    d.idProcesso,
    d.valor,
    d.tipoMovimento,
    d.dataMovimento,
    d.colaboradorId,
    p.ref as numeroProcesso,
    c.denominacao as nomeCliente
  FROM
    despesas d
    INNER JOIN processos p ON d.idProcesso = p.id
    INNER JOIN clientes c ON p.cliente_id = c.id
  ${where}
  `;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {Despesas}
 */
async function getAllByKeyValue(chave, valor) {
  return await Despesas.findAll({
    where: {
      [chave]: valor
    }
  })
}

module.exports = {
  create,
  getAll,
  getAllByKeyValue,
  findAllFilter
};
