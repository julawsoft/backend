const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class TipoCliente extends Model {
  static associate(models) {
    // Defina associações, se houver
  }
}

TipoCliente.init({
  description: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'TipoCliente',
  tableName: 'tipo_cliente',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * @returns {Object} ClienteEntity
 */
async function listAll() {
  return TipoCliente.findAll()
}

/**
 * @param id number
 * @returns {Object} TipoCliente
 */

async function listById(id) {
  return await TipoCliente.findOne({where: {id}})
}

module.exports = {
    listAll,
    listById
};
