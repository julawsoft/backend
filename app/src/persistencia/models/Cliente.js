const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class Cliente extends Model {
  static associate(models) {
    // Defina associações, se houver
  }
}

Cliente.init({}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'clientes',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @param {string} name - Description
 * @returns {Object} ClienteEntity
 */
async function create({name}) {
  console.log("AKJSKASJKSJk", name, await Cliente.create({name}))
}

module.exports = {create};
