const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessosEquipas extends Model {
  static associate(models) { }
}

ProcessosEquipas.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  processo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ProcessosEquipas',
  tableName: 'processo_equipa',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {number} processo_id
* @param {number} colaborador_id
* @returns {ProcessosEquipas}
*/
async function createEquipa(
  {
    processo_id,
    colaborador_id,
  }
) {

  return await ProcessosEquipas.create({
    "processo_id": processo_id,
    "colaborador_id": colaborador_id,
  })
}


/**
 * @returns {ProcessosEquipas}
 */
async function getAll() {
  return await ProcessosEquipas.findAll()
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {ProcessosEquipas}
 */
async function getAllByKeyValue(chave, valor) {
  return await ProcessosEquipas.findAll({
    where: {
      [chave]: valor
    }
  })
}


async function getByProcessoId(id) {

  let queryString = `SELECT 
  p_equipa.*,
  c.nome_completo AS colaborador,
  c.funcao,
  tc.description AS colaborador_tipo
  
  FROM processo_equipa p_equipa
  INNER JOIN colaboradores c 
  ON p_equipa.colaborador_id = c.id
  INNER JOIN tipo_colaboradores tc
  ON c.tipo_colaborador_id = tc.id
  WHERE p_equipa.processo_id = ${id}
  `;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.SELECT,
});
}

module.exports = {
  createEquipa,
  getAll,
  getAllByKeyValue,
  getByProcessoId
};
