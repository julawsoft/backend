const { Model, DataTypes, QueryTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessosAnexos extends Model {
  static associate(models) { }
}

ProcessosAnexos.init({
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
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  colaborador_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ProcessosAnexos',
  tableName: 'processo_anexos',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {number} processoId
* @param {number} colaboradorId
* @param {string} descricao
* @param {string} path
* @returns {ProcessosEquipas}
*/
async function createAnexo(
  {
    processoId,
    colaboradorId,
    descricao,
    path
  }
) {

  return await ProcessosAnexos.create({
    "processo_id": processoId,
    "colaborador_id": colaboradorId,
    "descricao": descricao,
    "path": path,
  })
}

async function getByProcessosId(id) {

  let queryString = `SELECT 
  pa.*,
  c.nome_completo AS colaborador,
  c.funcao,
  tc.description AS colaborador_tipo
  
  FROM processo_anexos pa
  INNER JOIN colaboradores c 
  ON pa.colaborador_id = c.id
  INNER JOIN tipo_colaboradores tc
  ON c.tipo_colaborador_id = tc.id
  WHERE pa.processo_id = ${id}
  `;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.SELECT,
});
}


async function getAllByKeyValue(key, value) {

  let queryString = `SELECT 
  pa.*,
  c.nome_completo AS colaborador,
  c.funcao,
  tc.description AS colaborador_tipo
  FROM processo_anexos pa
  INNER JOIN colaboradores c 
  ON pa.colaborador_id = c.id
  INNER JOIN tipo_colaboradores tc
  ON c.tipo_colaborador_id = tc.id
  WHERE pa.${key} = ${value}
  `;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.SELECT,
});
}


module.exports = {
  createAnexo,
  getAllByKeyValue,
  getByProcessosId
};
