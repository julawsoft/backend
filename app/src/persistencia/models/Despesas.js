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
  DATE_FORMAT(c.created_at, '%d/%m/%Y') AS criadaEm,
  d.status
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

async function getAllDespesas({
  colaboradorId,
  processoId,
  clienteId,
  tipoDespesaId,
  statusId,
  dataInicio,
  dataFim,
}) {
  let query = `
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
      DATE_FORMAT(d.created_at, '%d/%m/%Y') AS criadaEm,
      d.status
    FROM despesas AS d
      INNER JOIN processos AS p ON d.idProcesso = p.id
      INNER JOIN clientes AS c ON p.cliente_id = c.id
      INNER JOIN tipos_despesas AS tp ON d.tipo_despesa = tp.id
      INNER JOIN colaboradores AS cl ON d.colaboradorId = cl.id
    WHERE 1=1
  `;

  const replacements = [];

  // filtros opcionais
  if (colaboradorId) {
    query += " AND d.colaboradorId = ? ";
    replacements.push(colaboradorId);
  }

  if (processoId && processoId != 'undefined') {
    query += " AND d.idProcesso = ? ";
    replacements.push(processoId);
  }

  if (clienteId && clienteId !== 'undefined') {
    query += " AND p.cliente_id = ? ";
    replacements.push(clienteId);
  }

  if (tipoDespesaId) {
    query += " AND d.tipo_despesa = ? ";
    replacements.push(tipoDespesaId);
  }

  if (statusId && statusId !== 'undefined') {
    query += " AND d.status = ? ";
    replacements.push(statusId);
  }

  if (dataInicio && dataFim) {
    query += " AND d.dataMovimento BETWEEN ? AND ? ";
    replacements.push(dataInicio, dataFim);
  }

  query += " ORDER BY d.dataMovimento DESC";

  const results = await Despesas.sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return results;
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

  let where = "";

  if ((clienteId != 0) && (processoId == 0))
    where = `where c.id = ${clienteId}`

  if ((clienteId == 0) && (processoId != 0))
    where = `where d.idProcesso = ${processoId}`

  if ((clienteId != 0) && (processoId != 0))
    where = `where c.id = ${clienteId} and d.idProcesso = ${processoId}`


  const queryString = `
    SELECT
    d.id,
    d.idProcesso,
    d.valor,
    d.tipoMovimento,
    d.dataMovimento,
    d.colaboradorId,
    p.ref as numeroProcesso,
    c.denominacao as nomeCliente,
    d.status
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

async function changeStatus(id, status, data = new Date()) {

  const result = Despesas.sequelize.query(`
    UPDATE despesas
    SET 
      status=?,
      updated_at=?
    WHERE id = ? 
  `, {
    replacements: [
      status,
      data,
      id
    ]
  });

  return (await result);

}



async function findOne(despesaId) {
  let query = `
    SELECT
      d.id,
      d.idProcesso,
      FORMAT(d.valor, 2, 'de_DE') AS valor,
      d.tipoMovimento,
      DATE_FORMAT(d.dataMovimento, '%d/%m/%Y %H:%i:%s') AS dataMovimento,
      d.colaboradorId,
      c.id as clienteId,
      p.ref AS numeroProcesso,
      c.denominacao AS nomeCliente,
      cl.nome_completo AS colaborador,
      tp.label AS tipoDespesasLabel,
      tp.descricao AS tipoDespesas,
      tp.id as tipoDespesaId,
      DATE_FORMAT(d.created_at, '%d/%m/%Y') AS criadaEm,
      d.status
    FROM despesas AS d
      INNER JOIN processos AS p ON d.idProcesso = p.id
      INNER JOIN clientes AS c ON p.cliente_id = c.id
      INNER JOIN tipos_despesas AS tp ON d.tipo_despesa = tp.id
      INNER JOIN colaboradores AS cl ON d.colaboradorId = cl.id
    WHERE 1=1
  `;

  const replacements = [];

  // filtros opcionais
  if (despesaId) {
    query += " AND d.id = ? ";
    replacements.push(despesaId);
  }

  const results = await Despesas.sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });

  return results;
}

/**
 * Atualiza uma despesa existente.
 * 
 * @param {number} id - ID da despesa a atualizar
 * @param {object} data - Dados a atualizar
 * @param {number} data.colaboradorId
 * @param {string} data.dataMovimento
 * @param {number} data.valor
 * @param {number} data.clienteId
 * @param {number} data.tipoDespesaId
 * @param {number} data.processoId
 * @returns {Promise<object>} A despesa atualizada
 */
async function update(id, {
  colaboradorId,
  dataMovimento,
  valor,
  clienteId,
  tipoDespesaId,
  processoId
}) {
  // Verifica se o registro existe
  const despesa = await Despesas.findByPk(id);
  if (!despesa) {
    throw new Error(`Despesa com ID ${id} não encontrada.`);
  }

  // Atualiza a despesa
  await Despesas.update(
    {
      colaboradorId,
      valor,
      clienteId,
      tipo_despesa: tipoDespesaId,
      dataMovimento,
      idProcesso: processoId,
      tipoMovimento: 1,
      updated_at: new Date()
    },
    {
      where: { id }
    }
  );

  // Retorna o registro atualizado
  return await Despesas.findByPk(id, {
    raw: true
  });
}



module.exports = {
  create,
  getAll,
  getAllByKeyValue,
  findAllFilter,
  getAllDespesas,
  changeStatus,
  findOne,
  update
};
