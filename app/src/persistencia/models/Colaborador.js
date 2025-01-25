const { Model, DataTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Colaborador extends Model {
  static associate(models) {}
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
  nomeCompleto,
  nomeProfissional,
  dataNascimento,
  funcao,
  tipoColaboradorId,
  uuid,
  status,
  inicial,
  taxa_horaria
}) {
  console.log("taxa_horaria", taxa_horaria);
  return Colaborador.create({
    nome_completo: nomeCompleto,
    nome_profissional: nomeProfissional,
    data_nascimento: dataNascimento,
    uuid: uuid,
    status: status,
    funcao: funcao,
    tipo_colaborador_id: tipoColaboradorId,
    inicial: inicial,
    taxa_horaria: taxa_horaria == "" ? undefined : taxa_horaria,
    status: status
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
  dataNascimento,
  funcao,
  tipoColaboradorId,
  status,
  inicial,
  taxa_horaria,
  id
}) {
  return Colaborador.update(
    {
      nome_completo: nomeCompleto,
      nome_profissional: nomeProfissional,
      data_nascimento: dataNascimento,
      status: status,
      funcao: funcao,
      tipo_colaborador_id: tipoColaboradorId,
      inicial: inicial,
      taxa_horaria: taxa_horaria
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

async function getTimesheetFacturaByColaboradorId(idColaborador) {
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
    p.assunto,
    pfi.id AS processoFacturaItemId,
    (SELECT custo FROM processo_factura_items WHERE processo_factura_items.processos_timesheet_id = pt.id)
    AS custo,
    (SELECT status FROM processo_facturas WHERE processo_facturas.id = 
    	(SELECT processo_factura_id FROM processo_factura_items WHERE processo_factura_items.processos_timesheet_id = pt.id)
    ) AS estado

    FROM processos_timesheet pt
    INNER JOIN processos p
    ON pt.processo_id = p.id
    INNER JOIN colaboradores c
    ON pt.colaborador_id = c.id
    LEFT JOIN processo_factura_items pfi
    ON pt.id = pfi.processos_timesheet_id

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
  getTimesheetFacturaByColaboradorId
};
