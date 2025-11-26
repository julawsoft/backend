const { Model, DataTypes, QueryTypes } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Processos extends Model {
  static associate(models) { }
}

Processos.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    assunto: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ref: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fase: {
      type: DataTypes.ENUM("Extrajudicial", "Judicial"),
      allowNull: false
    },
    instituicao_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modo_facturacao_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    gestor_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    contra_parte: {
      type: DataTypes.STRING,
      allowNull: true
    },
    data_registo: {
      type: DataTypes.DATE,
      allowNull: false
    },
    data_suspensao: {
      type: DataTypes.DATE,
      allowNull: true
    },
    colaborador_id_suspendeu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    data_encerramento: {
      type: DataTypes.DATE,
      allowNull: true
    },
    colaborador_id_encerrou: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    metodologia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    estrategia: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    factos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    objectivos: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dados_importantes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    horas_mes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    valor_total: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    data_emissao_factura: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    n_processo_judicial: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: "Processos",
    tableName: "processos",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

/**
 * @param {string} assunto
 * @param {string} area
 * @param {string} fase
 * @param {number} instituicaoId
 * @param {number} modoFacturacaoId
 * @param {number} clienteId
 * @param {number} gestorId
 * @param {string} contraParte
 * @param {string} dataRegisto
 * @param {string} dataSuspensao
 * @param {string} colaboradorIdSuspendeu
 * @param {string} dataEncerramento
 * @param {string} colaboradorIdEnderrou
 * @param {string} metodologia
 * @param {string} estrategia
 * @param {string} factos
 * @param {string} objectivos
 * @param {string} dataImportantes
 * @param {string} horasMes
 * @param {string} valorTotal
 * @param {string} dataEmissaoFactura
 * @param {string} nProcessoJudicial
 * @returns {Processos}
 */
async function create({
  assunto,
  area,
  fase,
  instituicaoId,
  modoFacturacaoId,
  clienteId,
  gestorId,
  contraParte,
  dataRegisto,
  dataSuspensao,
  colaboradorIdSuspendeu,
  dataEncerramento,
  colaboradorIdEnderrou,
  metodologia,
  estrategia,
  factos,
  objectivos,
  dataImportantes,
  statusId,
  horasMes,
  valorTotal,
  dataEmissaoFactura,
  nProcessoJudicial
}) {
  return Processos.create({
    ref: (await generateRefProcesso()).toString(),
    assunto: assunto,
    area: area,
    fase: fase,
    instituicao_id: instituicaoId,
    modo_facturacao_id: modoFacturacaoId,
    cliente_id: clienteId,
    gestor_id: gestorId,
    contra_parte: contraParte,
    data_registo: dataRegisto,
    data_suspensao: dataSuspensao,
    colaborador_id_suspendeu: colaboradorIdSuspendeu,
    data_encerramento: dataEncerramento,
    colaborador_id_encerrou: colaboradorIdEnderrou,
    metodologia: metodologia,
    estrategia: estrategia,
    factos: factos,
    objectivos: objectivos,
    dados_importantes: dataImportantes,
    status_id: statusId,
    horas_mes: horasMes,
    valor_total: valorTotal,
    data_emissao_factura: dataEmissaoFactura,
    n_processo_judicial: nProcessoJudicial
  });
}

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValue(chave, valor) {
  return await Processos.findAll({
    where: {
      [chave]: valor
    }
  });
}

async function getAll({
  clientId,
  instituicaoId,
  fase,
  estadoId,
  gestorId,
  colaboradorId,
  mFacturacaoId,
  dataInicio,
  dataFim,
}) {
  let query = `
    SELECT 
      p.*,
      p_status.descricao AS estado,
      p_instituicoes.descricao AS instituicao,
      p_facturacao.descricao AS modo_facturacao,
      c.nome_completo AS gestor,
      c_suspendeu.nome_completo AS colaborador_suspendeu,
      c_enderrou.nome_completo AS colaborador_encerrou,
      cli.denominacao AS cliente,
      tcli.description AS tipo_cliente
    FROM processos p
    INNER JOIN processo_estado p_status
      ON p.status_id = p_status.id
    INNER JOIN processo_instituicoes p_instituicoes
      ON p.instituicao_id = p_instituicoes.id
    INNER JOIN processo_facturacao p_facturacao
      ON p.modo_facturacao_id = p_facturacao.id
    LEFT JOIN colaboradores c
      ON p.gestor_id = c.id
    LEFT JOIN colaboradores c_suspendeu
      ON p.colaborador_id_suspendeu = c_suspendeu.id
    LEFT JOIN colaboradores c_enderrou
      ON p.colaborador_id_encerrou = c_enderrou.id
    LEFT JOIN clientes cli
      ON p.cliente_id = cli.id
    LEFT JOIN tipo_cliente tcli
      ON cli.tipo_id = tcli.id
    WHERE 1=1
  `;

  const replacements = [];

  // 🔥 função utilitária para evitar repetir código
  let addFilter = (field, value) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== '' &&
      value !== 0 &&
      value !== 'undefined'
    ) {
      query += ` AND ${field} = ? `;
      replacements.push(value);
    }
  };

  addFilter("p.cliente_id", clientId);
  addFilter("p.instituicao_id", instituicaoId);
  addFilter("p.fase", fase);
  addFilter("p.status_id", estadoId);
  addFilter("p.gestor_id", gestorId);
  addFilter("p.colaborador_id_suspendeu", colaboradorId);
  addFilter("p.modo_facturacao_id", mFacturacaoId);

  // filtro por intervalo de datas
  if (dataInicio && dataFim) {
    query += " AND left(p.created_at,10) BETWEEN ? AND ? ";
    replacements.push(dataInicio, dataFim);
  }

  query += " ORDER BY p.created_at DESC ";

  return sequelize.query(query, {
    replacements,
    type: QueryTypes.SELECT,
  });
}


async function getById(id) {
  // return await Processos.findAll()
  let queryString = `SELECT 
  p.*,
  p_status.descricao AS estado,
  p_instituicoes.descricao AS instituicao,
  p_facturacao.descricao AS modo_facturacao,
  c.nome_completo AS gestor,
  c_suspendeu.nome_completo AS colaborador_suspendeu,
  c_enderrou.nome_completo AS colaborador_encerrou,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente
  
  FROM processos p
  
  INNER JOIN processo_estado p_status
  ON p.status_id = p_status.id
  INNER JOIN processo_instituicoes p_instituicoes
  ON p.instituicao_id = p_instituicoes.id
  INNER JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao_id = p_facturacao.id
  LEFT JOIN colaboradores c
  ON p.gestor_id = c.id
  LEFT JOIN colaboradores c_suspendeu
  ON p.colaborador_id_suspendeu = c_suspendeu.id
  LEFT JOIN colaboradores c_enderrou
  ON p.colaborador_id_encerrou = c_enderrou.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id
  where p.id = ${id}
  `;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

async function getByColaboradorId(idColaborador) {
  // return await Processos.findAll()
  let queryString = ` 
  SELECT 
  p.*,
  p_status.descricao AS estado,
  p_instituicoes.descricao AS instituicao,
  p_facturacao.descricao AS modo_facturacao,
  c.nome_completo AS gestor,
  c_suspendeu.nome_completo AS colaborador_suspendeu,
  c_enderrou.nome_completo AS colaborador_encerrou,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente
  
  FROM processos p
  
  INNER JOIN processo_estado p_status
  ON p.status_id = p_status.id
  INNER JOIN processo_instituicoes p_instituicoes
  ON p.instituicao_id = p_instituicoes.id
  INNER JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao_id = p_facturacao.id
  LEFT JOIN colaboradores c
  ON p.gestor_id = c.id
  LEFT JOIN colaboradores c_suspendeu
  ON p.colaborador_id_suspendeu = c_suspendeu.id
  LEFT JOIN colaboradores c_enderrou
  ON p.colaborador_id_encerrou = c_enderrou.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id
  WHERE p.id IN  (SELECT processo_equipa.processo_id FROM processo_equipa
   WHERE processo_equipa.colaborador_id = ${idColaborador})
   OR p.gestor_id=${idColaborador}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

async function generateRefProcesso() {
  let queryString = "SELECT MAX(id) as id FROM processos";
  let result = await sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });

  const { id } = result[0]

  let year = new Date().getFullYear()
  let month = new Date().getMonth() + 1;

  let idEnd = id ? id : 1;

  return `0000${parseInt(idEnd) + 1}/${month}-${year}`
}

/**
 * @param {number} processoId
 * @param {string} assunto
 * @param {string} area
 * @param {string} fase
 * @param {number} instituicaoId
 * @param {number} modoFacturacaoId
 * @param {number} clienteId
 * @param {number} gestorId
 * @param {string} contraParte
 * @param {string} dataRegisto
 * @param {string} dataSuspensao
 * @param {string} colaboradorIdSuspendeu
 * @param {string} dataEncerramento
 * @param {string} colaboradorIdEnderrou
 * @param {string} metodologia
 * @param {string} estrategia
 * @param {string} factos
 * @param {string} objectivos
 * @param {string} dataImportantes
 * @param {string} horasMes
 * @param {string} valorTotal
 * @param {string} dataEmissaoFactura
 * @param {string} nProcessoJudicial
 * @returns {Processos}
 */
async function update({
  processoId,
  assunto,
  area,
  fase,
  instituicaoId,
  modoFacturacaoId,
  clienteId,
  gestorId,
  contraParte,
  dataRegisto,
  dataSuspensao,
  colaboradorIdSuspendeu,
  dataEncerramento,
  colaboradorIdEnderrou,
  metodologia,
  estrategia,
  factos,
  objectivos,
  dataImportantes,
  statusId,
  horasMes,
  valorTotal,
  dataEmissaoFactura,
  nProcessoJudicial
}) {
  return Processos.update(
    {
      assunto: assunto,
      area: area,
      fase: fase,
      instituicao_id: instituicaoId,
      modo_facturacao_id: modoFacturacaoId,
      cliente_id: clienteId,
      gestor_id: gestorId,
      contra_parte: contraParte,
      data_registo: dataRegisto,
      data_suspensao: dataSuspensao,
      colaborador_id_suspendeu: colaboradorIdSuspendeu,
      data_encerramento: dataEncerramento,
      colaborador_id_encerrou: colaboradorIdEnderrou,
      metodologia: metodologia,
      estrategia: estrategia,
      factos: factos,
      objectivos: objectivos,
      dados_importantes: dataImportantes,
      status_id: statusId,
      horas_mes: horasMes,
      valor_total: valorTotal,
      data_emissao_factura: dataEmissaoFactura,
      n_processo_judicial: nProcessoJudicial
    },
    {
      where: {
        id: processoId
      }
    }
  );
}

async function getByClienteId(idCliente) {
  // return await Processos.findAll()
  let queryString = ` 
  SELECT 
  p.*,
  p_status.descricao AS estado,
  p_instituicoes.descricao AS instituicao,
  p_facturacao.descricao AS modo_facturacao,
  c.nome_completo AS gestor,
  c_suspendeu.nome_completo AS colaborador_suspendeu,
  c_enderrou.nome_completo AS colaborador_encerrou,
  cli.denominacao AS cliente,
  tcli.description AS tipo_cliente
  
  FROM processos p
  
  INNER JOIN processo_estado p_status
  ON p.status_id = p_status.id
  INNER JOIN processo_instituicoes p_instituicoes
  ON p.instituicao_id = p_instituicoes.id
  INNER JOIN processo_facturacao p_facturacao
  ON p.modo_facturacao_id = p_facturacao.id
  LEFT JOIN colaboradores c
  ON p.gestor_id = c.id
  LEFT JOIN colaboradores c_suspendeu
  ON p.colaborador_id_suspendeu = c_suspendeu.id
  LEFT JOIN colaboradores c_enderrou
  ON p.colaborador_id_encerrou = c_enderrou.id
  LEFT JOIN clientes cli
  ON p.cliente_id = cli.id
  LEFT JOIN tipo_cliente tcli
  ON cli.tipo_id = tcli.id
  WHERE p.cliente_id = ${idCliente}`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

async function getFacturas(id) {
  let queryString = `SELECT 
  p.*,
  CONCAT('[', 
    GROUP_CONCAT(
        CONCAT(
            '{"processo_time_sheet_id":"', pf.processos_timesheet_id, 
            '","horas":', pf.horas, 
            ',"custo":', pf.custo, 
            '}'
        ) SEPARATOR ','
   
    ),
	 ']') 
	 AS itens
FROM 
  processo_facturas p
LEFT JOIN 
  processo_factura_items pf 
ON 
  p.id = pf.processo_factura_id
WHERE 
  p.processo_id = ${id}
GROUP BY 
  p.id`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

/**
 * Atualiza os campos metodológicos de um processo.
 * 
 * @param {Object} params
 * @param {string} params.metodologia
 * @param {string} params.estrategia
 * @param {string} params.factos
 * @param {string} params.objectivos
 * @param {string} params.dataImportantes
 * @param {number} params.processoId
 * @returns {Promise<any>}
 */
async function updateProcessoMetodologias(
  metodologia = '',
  estrategia = '',
  factos = '',
  objectivos = '',
  dataImportantes = '',
  processoId
) {

  console.log("O meu ID ", processoId)
  console.log("O meu ID ", metodologia)
  console.log("O meu ID ", estrategia)

  if (!processoId) {
    throw new Error("O campo 'processoId' é obrigatório.");
  }

  const [result] = await Processos.sequelize.query(
    `
    UPDATE processos
    SET 
      metodologia = ?,
      estrategia = ?,
      factos = ?,
      objectivos = ?,
      dados_importantes = ?
    WHERE id = ?
    `,
    {
      replacements: [
        metodologia,
        estrategia,
        factos,
        objectivos,
        dataImportantes,
        processoId
      ],
    }
  );

  console.log("o result ", result)

  return result;
}


module.exports = {
  create,
  getAllByKeyValue,
  getAll,
  getById,
  update,
  getByColaboradorId,
  getByClienteId,
  getFacturas,
  updateProcessoMetodologias
};
