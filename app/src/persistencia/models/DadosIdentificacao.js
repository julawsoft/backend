const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class DadosIdentificacao extends Model {
  static associate(models) {}
}

DadosIdentificacao.init({
  tipo_documento_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_emissao: {
    type: DataTypes.DATE,
    allowNull: true
  },
  data_validade: {
    type: DataTypes.DATE,
    allowNull: true

  },
  colaborador_id: {
    type: DataTypes.NUMBER
  },
}, {
  sequelize,
  modelName: 'DadosIdentificacao',
  tableName: 'dados_identificacao',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {number} tipoDocumentoId
* @param {string} valor
* @param {string} dataEmissao
* @param {string} dataValidade
* @param {number} colaboradorId
*
* @returns {Array} DadosContacto
*/
async function create(
  {
    tipoDocumentoId,
    valor,
    dataEmissao,
    dataValidade,
    colaboradorId
}
) {

  return await DadosIdentificacao.create({
    "tipo_documento_id": tipoDocumentoId,
    "valor": valor,
    "data_emissao": dataEmissao,
    "data_validade": dataValidade,
    "colaborador_id": colaboradorId
  })
}



/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  return DadosIdentificacao.findAll({
    where: {
      [chave]: valor
    }
  })
}


module.exports = {
    getAllByKeyValue,
    create,
    DadosIdentificacao
};
