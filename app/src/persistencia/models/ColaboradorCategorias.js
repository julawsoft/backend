const { Model, DataTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ColaboradorCategorias extends Model {
  static associate(models) { }
}

ColaboradorCategorias.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    descricao: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('activo','inactivo'),
      allowNull: false,
      defaultValue: 'activo'
    },
  },
  {
    sequelize,
    modelName: "ColaboradorCategorias",
    tableName: "colaborador_categorias",
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
  return await ColaboradorCategorias.findAll();
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
