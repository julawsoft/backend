const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * 
 * @class
 */
class TiposDespesas extends Model {
  static associate(models) { }
}

TiposDespesas.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  label: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'TiposDespesas',
  tableName: 'tipos_despesas',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @returns {TiposDespesas}
 */
async function getAllTiposDespesas() {
  return TiposDespesas.findAll();
}

module.exports = {
  getAllTiposDespesas,
};
