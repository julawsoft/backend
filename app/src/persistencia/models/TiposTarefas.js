const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * 
 * @class
 */
class TiposTarefas extends Model {
  static associate(models) { }
}

TiposTarefas.init({
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
  modelName: 'TiposTarefas',
  tableName: 'tipos_tarefas',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @returns {TiposDespesas}
 */
async function getAllTiposTarefas() {
  return TiposTarefas.findAll();
}

module.exports = {
  getAllTiposTarefas,
};
