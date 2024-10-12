const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class DadosCustoFinanceiro extends Model {
  static associate(models) {}
}

DadosCustoFinanceiro.init({
  taxa_horaria: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  colaboradorId: {
    type: DataTypes.INTEGER
  },
}, {
  sequelize,
  modelName: 'DadosCustoFinanceiro',
  tableName: 'dados_custo_financeiro',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {number} taxaHoraria

*
* @returns {Array}
*/
async function create(
  {
    taxaHoraria,
    colaboradorId
}
) {

  return await DadosCustoFinanceiro.create({
    "taxa_horaria": taxaHoraria,
    "colaboradorId": colaboradorId
  })
}



/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  return DadosCustoFinanceiro.findAll({
    where: {
      [chave]: valor
    }
  })
}


module.exports = {
    getAllByKeyValue,
    create,
    DadosCustoFinanceiro
};
