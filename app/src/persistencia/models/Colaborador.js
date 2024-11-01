const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Colaborador extends Model {
  static associate(models) { }
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
      "data_nascimento": dataNascimento,
      "uuid": uuid,
      "status": status,
      "funcao": funcao,
      "tipo_colaborador_id": tipoColaboradorId,
      "inicial": inicial,
    }
  )
}

/**
 * @param {string} nomeCompleto - Description
 * @param {string} nomeProfissional - Description
 * @param {string} dataNascimento - Description
 * @param {string} uuid - Description
 * @param {string} status - Description
 * @param {string} funcao - Description
 * @param {string} tipoColaboradorId - Description
 * @param {string} inicial - Description
 * @returns {number} id
 * @returns {Object} Colaborador
 */
async function update(
  {
    nomeCompleto,
    nomeProfissional,
    dataNascimento,
    funcao,
    tipoColaboradorId,
    uuid,
    status,
    inicial,
    id
  }
) {

  return Colaborador.update(
    {
      "nome_completo": nomeCompleto,
      "nome_profissional": nomeProfissional,
      "data_nascimento": dataNascimento,
      "uuid": uuid,
      "status": status,
      "funcao": funcao,
      "tipo_colaborador_id": tipoColaboradorId,
      "inicial": inicial,
    },
    {
      where: {
        id
      }
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

async function getAll() {
  return await Colaborador.findAll()
}

async function getAllQuery() {
  const result = await Colaborador.sequelize.query(`
  SELECT
    c.id,
    c.status,
    c.nome_completo,
    c.nome_profissional,
    c.data_nascimento,
    c.funcao,
    c.tipo_colaborador_id,
    GROUP_CONCAT(
        DISTINCT concat(dc.id, '|', dc.type)
        ORDER BY dc.id
    ) as contact_type,
    GROUP_CONCAT(
        DISTINCT concat(dc.id, '|', dc.value)
        ORDER BY dc.id
    ) as contact_value,
    GROUP_CONCAT(
        DISTINCT concat(di.id,'|',di.tipo_documento_id)
        ORDER BY di.id
    ) as tipo_documentos_id,
    GROUP_CONCAT(
        DISTINCT concat(di.id, '|', di.valor)
        ORDER BY di.id
    ) as tipo_documentos_code,
    tc.description,
    tc.id as id_categoria
  FROM
    colaboradores c
    LEFT JOIN dados_contactos dc ON c.id = dc.colaboradorId
    LEFT JOIN dados_identificacao di ON c.id = di.colaborador_id
    LEFT JOIN tipo_colaboradores tc ON c.tipo_colaborador_id = tc.id
  GROUP BY
    c.id
  `);

  return result[0];
}

module.exports = {
  create,
  getAllByKeyValue,
  getAll,
  update,
  getAllQuery
};
