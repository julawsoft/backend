const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');

console.log("aqui", SequelizeConnection)

const sequelize = SequelizeConnection.getConnection().instance

class Colaborador extends Model {
  static associate(models) {}
}
// lincar com a Table no banco e validar os valores do constructor
Colaborador.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name_profissional: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Colaborador',
  tableName: 'colaboradores',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
 * @param {string} nomeCompleto - Description
 * @param {string} nomeProfissional - Description
 * @param {string} dataNascimento - Description
 * @param {string} uuid - Description
 * @param {string} status - Description
 * @returns {Object} Colaborador
 */
async function create(
  {
    nomeCompleto, 
    nomeProfissional, 
    dataNascimento,
    uuid,
    status,
  }
) {
  console.log("nomeCompleto >>> ",nomeCompleto)
  return Colaborador.create(
    {
      "name_completo": nomeCompleto, 
      "name_profissional": nomeProfissional, 
      "data_nascimento" : dataNascimento,
      "uuid" : uuid,
      "status" : status,

    }
  )
}


/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  console.log(chave)
  return await Colaborador.findAll({
    where: {
      [chave]: valor
    }
  })
}


module.exports = {
  create,
  getAllByKeyValue,
};
