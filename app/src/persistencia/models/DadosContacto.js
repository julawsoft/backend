const { Model, DataTypes, col, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js"); // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class DadosContacto extends Model {
  static associate(models) {}
}

DadosContacto.init(
  {
    type: {
      type: DataTypes.ENUM("telefone", "e-mail", "endereco", "outro"),
      allowNull: false,
      defaultValue: "telefone"
    },
    value: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    colaboradorId: {
      type: DataTypes.NUMBER
    }
  },
  {
    sequelize,
    modelName: "DadosContacto",
    tableName: "dados_contactos",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

/**
 * @returns {Object}
 */
async function listAll() {
  return DadosContacto.findAll();
}

/**
 * @param id number
 * @returns {Object} DadosContacto
 */

async function listById(id) {
  return await DadosContacto.findOne({ where: { id } });
}

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  return DadosContacto.findAll({
    where: {
      [chave]: valor
    }
  });
}

/**
 * @param {number} tipo
 * @param {string} valor
 * @param {string} descricao
 * @param {number} colaboradorId
 *
 * @returns {Array} DadosContacto
 */
async function create({ tipo, valor, descricao, colaboradorId }) {
  return await DadosContacto.create({
    type: tipo,
    value: valor,
    description: descricao,
    colaboradorId: colaboradorId
  });
}

async function update({ tipo, valor, colaboradorId }) {
  let queryString = `UPDATE dados_contactos 
                    SET type=${tipo}, value=${valor}
                    WHERE 
                    colaboradorId=${colaboradorId} AND value=${valor}
                    `;
  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}


async function deleteDadosContactoByColaborado(colaboradorId) {

  let queryString = `DELETE FROM dados_contactos
                    WHERE 
                    colaboradorId=${colaboradorId}`;
  return sequelize.query(queryString, {
    type: QueryTypes.DELETE
  });
}

module.exports = {
  listAll,
  listById,
  getAllByKeyValue,
  create,
  DadosContacto,
  update,
  deleteDadosContactoByColaborado
};
