const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class TipoColaborador extends Model {
  static associate(models) {}
}

TipoColaborador.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'TipoColaborador',
  tableName: 'tipo_colaboradores',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

/**
 * @returns {Object}
 */
async function listAll() {
  return TipoColaborador.findAll()
}

/**
 * @param id number
 * @returns {Object} TipoColaborador
 */

async function listById(id) {
  return TipoColaborador.findOne({where: {id}})
}

module.exports = {
    listAll,
    listById,
    TipoColaborador
};
