const { Model, DataTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Colaborador extends Model {
  static associate(models) { }
}

Colaborador.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    nome_completo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nome_profissional: {
      type: DataTypes.STRING,
      allowNull: false
    },
    inicial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    funcao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tipo_colaborador_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_nascimento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    token_reset: {
      type: DataTypes.STRING,
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    taxa_horaria: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "pending"),
      allowNull: false,
      defaultValue: "pending"
    },
    contacto_pessoal: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    contacto_emergencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    contacto_emergencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    n_identificacao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    n_cedula_ordem: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email_pessoal: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email_corporativo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'colaborador_categorias',
        key: 'id',
      }
    }
  },
  {
    sequelize,
    modelName: "Colaborador",
    tableName: "colaboradores",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

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
async function create({
  username,
  nomeCompleto,
  nomeProfissional,
  funcao,
  tipoColaboradorId,
  dataNascimento,
  tokenReset,
  status,
  taxaHoraria,
  contactoPessoal,
  contactoEmergencia,
  nIdentificacao,
  nCedulaOrdem,
  emailPessoal,
  emailCorporativo,
  uuid,
  inicial,
  categoriaId
}) {

  console.log("taxa_horaria", uuid);
  
  return Colaborador.create({
    nome_completo: nomeCompleto,
    nome_profissional: nomeProfissional,
    data_nascimento: dataNascimento,
    uuid: uuid,
    status: status,
    funcao: funcao,
    tipo_colaborador_id: tipoColaboradorId,
    inicial: inicial,
    taxa_horaria: taxaHoraria,
    status: status,
    contacto_pessoal: contactoPessoal,
    contacto_emergencia: contactoEmergencia,
    n_identificacao: nIdentificacao,
    n_cedula_ordem: nCedulaOrdem,
    email_pessoal: emailPessoal,
    email_corporativo: emailCorporativo,
    inicial: inicial,
    categoria_id: categoriaId,
  });
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
async function update({
  nomeCompleto,
  nomeProfissional,
  funcao,
  tipoColaboradorId,
  dataNascimento,
  tokenReset,
  status,
  taxaHoraria,
  contactoPessoal,
  contactoEmergencia,
  nIdentificacao,
  nCedulaOrdem,
  emailPessoal,
  emailCorporativo,
  uuid,
  inicial,
  categoriaId,
  id
}) {
  return Colaborador.update(
    {
      nome_completo: nomeCompleto,
    nome_profissional: nomeProfissional,
    data_nascimento: dataNascimento,
    uuid: uuid,
    status: status,
    funcao: funcao,
    tipo_colaborador_id: tipoColaboradorId,
    inicial: inicial,
    taxa_horaria: taxaHoraria,
    status: status,
    contacto_pessoal: contactoPessoal,
    contacto_emergencia: contactoEmergencia,
    n_identificacao: nIdentificacao,
    n_cedula_ordem: nCedulaOrdem,
    email_pessoal: emailPessoal,
    email_corporativo: emailCorporativo,
    inicial: inicial,
    categoria_id: categoriaId
    },
    {
      where: {
        id
      }
    }
  );
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
  });
}

async function getAll() {
  return await Colaborador.findAll();
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
    c.taxa_horaria,
    c.contacto_pessoal, 
    c.contacto_emergencia,
    c.n_identificacao,
    c.n_cedula_ordem,
    c.email_pessoal,
    c.email_corporativo,
    tc.description AS tipoColaborador,
    cc.descricao AS categoria
  FROM
    colaboradores c
    LEFT JOIN tipo_colaboradores tc ON c.tipo_colaborador_id = tc.id
    LEFT JOIN colaborador_categorias cc ON c.categoria_id = cc.id
  `);

  return result[0];
}

async function getTimesheetFacturaByColaboradorId(idColaborador) {
  const result = await Colaborador.sequelize.query(`
  SELECT
    c.id,
    c.status,
    c.nome_completo,
    c.nome_profissional,
    c.data_nascimento,
    c.funcao,
    c.tipo_colaborador_id,
    c.taxa_horaria,
    c.contacto_pessoal, 
    c.contacto_emergencia,
    c.n_identificacao,
    c.n_cedula_ordem,
    c.email_pessoal,
    c.email_corporativo,
    tc.description AS tipoColaborador,
    cc.descricao AS categoria
  FROM
    colaboradores c
    LEFT JOIN tipo_colaboradores tc ON c.tipo_colaborador_id = tc.id
    LEFT JOIN colaborador_categorias cc ON c.categoria_id = cc.id
    WHERE pt.colaborador_id = ${idColaborador}
  `);

  return result[0];
}

async function getTimesheetByColaboradorId(idColaborador) {
  const result = await Colaborador.sequelize.query(`
   SELECT 
    pt.id AS timeSheetId,
    pt.data_inicio, 
    pt.data_fim,
    pt.horas,
    pt.created_at AS dataRegistoTimesheet,
    p.id AS processoId,
    c.id AS colaboradorId,
    c.nome_completo AS colaborador,
    c.funcao AS colaboradorFuncao,
    p.ref, 
    p.assunto
 
    FROM processos_timesheet pt
    INNER JOIN processos p
    ON pt.processo_id = p.id
    INNER JOIN colaboradores c
    ON pt.colaborador_id = c.id

    WHERE pt.colaborador_id = ${idColaborador}
  `);

  return result[0];
}

module.exports = {
  create,
  getAllByKeyValue,
  getAll,
  update,
  getAllQuery,
  getTimesheetFacturaByColaboradorId,
  getTimesheetByColaboradorId
};
