const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * 
 * @class
 */
class ProcessoEstado extends Model {
  static associate(models) { }
}

ProcessoEstado.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ProcessoEstado',
  tableName: 'processo_estado',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {string} descricao
* @returns {ProcessoEstado}
*/
async function create(
  {
    descricao
  }
) {

  return await ProcessoEstado.create({
    "descricao": descricao
  })
}


/**
 * @returns {ProcessoEstado}
 */
async function getAll() {
  return await ProcessoEstado.findAll()
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {ProcessoEstado}
 */
async function getAllByKeyValue(chave, valor) {
  return await ProcessoEstado.findAll({
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
