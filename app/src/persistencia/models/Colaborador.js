const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

class Colaborador extends Model {
  static associate(models) {
    // Defina associações, se houver
  }
}

// lincar com a Table no banco e validar os valores do constructor
Colaborador.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  created_at: { // Alterado de 'createdAt' para 'created_at'
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Colaborador',
  tableName: 'colaboradores',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @param {string} name - Description
 * @returns {Object} ColaboradorEntity
 */
async function create({name}) {
  console.log("AKJSKASJKSJk", name, await Colaborador.create({name}))
}

module.exports = {create};
