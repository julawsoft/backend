const { Model, DataTypes, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js"); // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessosPrecedentes extends Model {
  static associate(models) {}
}

ProcessosPrecedentes.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    processo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precedente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ProcessosPrecedentes",
    tableName: "processo_precedentes",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

/**
 * @param {number} precedente_id
 * @param {number} processo_id
 * @returns {ProcessosPrecedentes}
 */
async function createPrecedente({ processo_id, precedente_id }) {
  return await ProcessosPrecedentes.create({
    processo_id: processo_id,
    precedente_id: precedente_id,
  });
}

/**
 * @returns {ProcessosPrecedentes}
 */
async function getAll() {
  return await ProcessosPrecedentes.findAll();
}

/**
 * @returns {string} chave
 * @returns {string} valor
 * @returns {ProcessosPrecedentes}
 */
async function getAllByKeyValue(chave, valor) {
  console.log("here...", chave, valor);

  return await ProcessosPrecedentes.findAll({
    where: {
      [chave]: valor,
    },
  });
}

async function getByProcessoId(id) {
  let queryString = `
	SELECT 
		(SELECT ref FROM processos WHERE processos.id = p_ante.precedente_id) AS precedente_refencia,
		(SELECT assunto FROM processos WHERE processos.id = p_ante.precedente_id) AS precedente_assunto,
    (SELECT id FROM processos WHERE processos.id = p_ante.precedente_id) AS precedente_id
   FROM processo_precedentes p_ante
   WHERE p_ante.processo_id = ${id}
  `;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT,
  });
}


async function removePrecedenteByProcesso(id) {
  if(!id)
    throw new Error('ID is required');

  let queryString = `DELETE FROM processo_precedentes WHERE processo_precedentes.id = ${id}`;
  
  return  sequelize.query(queryString, {
  type: QueryTypes.DELETE,
  });
  
}


module.exports = {
  createPrecedente,
  getAll,
  getAllByKeyValue,
  getByProcessoId,
  removePrecedenteByProcesso
};
