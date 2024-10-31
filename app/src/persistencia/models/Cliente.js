const { Model, DataTypes } = require('sequelize');
const SequelizeConnection = require('../SequelizeConnection.js');  // Importa a instância Singleton do Sequelize

const sequelize = SequelizeConnection.getConnection().instance

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Cliente extends Model {
  static associate(models) {
    // Defina associações, se houver
    Cliente.hasMany(models.TipoCliente);
  }
}

Cliente.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  denominacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nif: {
    type: DataTypes.STRING,
    allowNull: true
  },
  endereco: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pessoa_contacto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contacto_cobranca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nota: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  sequelize,
  modelName: 'Cliente',
  tableName: 'clientes',
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


/**
* @param {string} denominacao
* @param {number} tipo_id
* @param {string} nif
* @param {string} endereco
* @param {string} pessoa_contacto
* @param {string} contacto_cobranca
* @param {string} nota
* @param {string} status
* @returns {Array} Cliente
*/
async function create(
  {
    denominacao,
    tipoId,
    nif,
    endereco,
    pessoaContacto,
    contactoCobranca,
    nota,
    status
  }
) {

  return await Cliente.create({
      "denominacao": denominacao,
      "tipo_id": tipoId,
      "nif": nif,
      "endereco": endereco,
      "pessoa_contacto": pessoaContacto,
      "contacto_cobranca": contactoCobranca,
      "nota": nota,
      "status": status
  })
}


/**
 * @returns {Object} ClienteEntity
 */
async function getAll() {
  return await Cliente.findAll()
}

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  console.log(chave)
  return await Cliente.findAll({
    where: {
      [chave]: valor
    }
  })
}

/**
* @param {string} denominacao
* @param {number} tipo_id
* @param {string} nif
* @param {string} endereco
* @param {string} pessoa_contacto
* @param {string} contacto_cobranca
* @param {string} nota
* @param {string} status
* @returns {Array} Cliente
*/
async function updateById(
  {
    denominacao,
    tipoId,
    nif,
    endereco,
    pessoaContacto,
    contactoCobranca,
    nota,
    status,
    id
  }
) {

  try {

    console.log(`THIS IS BEFORE UPDATE`);
    const result = Cliente.sequelize.query(`
      UPDATE clientes
      SET 
        denominacao=?,
        nif=?,
        endereco=?,
        nota=?,
        status=?,
        pessoa_contacto=?,
        tipo_id=?,
        contacto_cobranca=?
      WHERE id = ? 
    `, {
      replacements: [
        denominacao,nif,endereco,nota,status,
        pessoaContacto,tipoId,contactoCobranca,id
      ]
    });
  
    return (await result);
    
  } catch (error) {
    
    console.log(`ERROR ON UPDATE: `,error);

  }
  return result;


  /* return await Cliente.update({
      "denominacao": denominacao,
      "tipo_id": tipoId,
      "nif": nif,
      "endereco": endereco,
      "pessoa_contacto": pessoaContacto,
      "contacto_cobranca": contactoCobranca,
      "nota": nota,
      "status": status
  }, {
    where: { id }
  }) */
}

module.exports = {
  create,
  getAll,
  getAllByKeyValue,
  Cliente,
  updateById
};
