const { Model, DataTypes } = require('sequelize');
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
    idProcesso,
    valor,
    tipoMovimento,
    dataMovimento,
    colaboradorId
  }
) {
  return await Despesas.create({
    idProcesso, valor, tipoMovimento, dataMovimento, colaboradorId
  })
}

/**
 * @returns {Despesas}
 */
async function getAll() {
  return await Despesas.findAll();
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
};
