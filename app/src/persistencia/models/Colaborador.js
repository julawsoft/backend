const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');

const sequelize = SequelizeConnection.getConnection().instance

class Colaborador extends Model {
  static associate(models) {}
}

Colaborador.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nome_completo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome_profissional: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  inicial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  funcao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: true
  },
  token_reset: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  uuid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
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
 * @param {string} funcao - Description
 * @param {string} tipoColaboradorId - Description
 * @param {string} inicial - Description
 * @returns {Object} Colaborador
 */
async function create(
  {
    nomeCompleto, 
    nomeProfissional, 
    dataNascimento,
    funcao,
    tipoColaboradorId,
    uuid,
    status,
    inicial,
  }
) {

  return Colaborador.create(
    {
      "nome_completo": nomeCompleto, 
      "nome_profissional": nomeProfissional, 
      "data_nascimento" : dataNascimento,
      "uuid" : uuid,
      "status" : status,
      "funcao": funcao,
      "tipo_colaborador_id": tipoColaboradorId,
      "inicial": inicial,
    }
  )
}


/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
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
