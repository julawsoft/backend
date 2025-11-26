const { Model, DataTypes, QueryTypes, where } = require("sequelize");
const SequelizeConnection = require("../SequelizeConnection.js");

const sequelize = SequelizeConnection.getConnection().instance;

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class ProcessoFacturas extends Model {
  static associate(models) {
    ProcessoFacturas.hasMany(models.PagamentoFactura, {
      foreignKey: 'factura_id',
      as: 'pagamentos'
    })
  }
}

ProcessoFacturas.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    processo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "processos",
        key: "id"
      }
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "clientes",
        key: "id"
      }
    },
    colaborador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "colaboradores",
        key: "id"
      }
    },
    horas: {
      allowNull: true,
      type: DataTypes.STRING
    },
    custo: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.ENUM("pendente", "pago"),
      defaultValue: "pendente"
    },
    tipo_honorario: {
      type: DataTypes.ENUM("timesheet", "despesas"),
      defaultValue: "timesheet"
    }
  },
  {
    sequelize,
    modelName: "ProcessoFacturas",
    tableName: "processo_facturas",
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
);

async function createProcessoFactura(data) {

  return ProcessoFacturas.create({
    "processo_id": data.processoId,
    "cliente_id": data.clienteId,
    "colaborador_id": data.colaboradorId,
    "horas": data.horas,
    "custo": data.custo,
    "status": data.status
  });
}

async function getProcessoFacturasByClienteId(idCliente) {

  // return await Processos.findAll()
  let queryString = `SELECT
	  p.*,
    pf.horas,
    pf.custo,
    pf.status,
    pf.created_at as data_registo_factura,
	  c.nome_completo AS colaborador,
	  cli.denominacao AS cliente,
    ps.descricao AS estado_processo,
    pf.created_at AS data_registo,
    pf.id as processo_factura_id
  FROM
    processo_facturas pf
    inner JOIN processos p ON pf.processo_id = p.id
    inner JOIN processo_estado ps ON p.status_id = ps.id
    INNER JOIN clientes cli ON pf.cliente_id = cli.id
	  LEFT JOIN colaboradores c ON pf.colaborador_id = c.id
  WHERE p.cliente_id = ${idCliente}
  order BY
  pf.created_at desc`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

async function getProcessoFacturasById(idProcessoFactura) {
  // return await Processos.findAll()
  let queryString = `SELECT 
  pf.id AS processo_facturacao_id,
  pf.processo_id,
  pf.horas AS processo_horas,  
  pf.custo AS processo_custo,  
  pf.status AS processo_facturacao_estado,
  DATE_FORMAT(pf.created_at, '%d/%m/%Y %H:%i') AS processo_facturacao_data_registo,
  p.ref AS processo_ref,
  p.n_processo_judicial AS processo_n_processo_judicial,
  p.assunto AS processo_assunto,
  FORMAT(p.valor_total, 2, 'pt_PT') AS processo_valor_total,
  p.horas_mes AS processo_horas_mes, 
  modo.descricao AS processo_modo_facturacao,
  p_estado.descricao AS processo_estado,
  c.denominacao AS cliente,
  c.nif AS clienteNIF,
  c.contacto_cobranca AS clienteContato,
  c.endereco AS clienteEndereco,
  cd.nome_completo AS colaborador,
  pf.status AS stadus

FROM processo_facturas pf
INNER JOIN processos p ON p.id = pf.processo_id
INNER JOIN processo_facturacao modo ON modo.id = p.modo_facturacao_id
INNER JOIN processo_estado p_estado ON p_estado.id = p.status_id
INNER JOIN clientes c ON c.id = pf.cliente_id
INNER JOIN colaboradores cd ON cd.id = pf.colaborador_id

  WHERE pf.id = ${idProcessoFactura}
  order BY
  pf.created_at desc`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}



async function getAllFacturas(idProcesso = undefined) {

  let where = idProcesso ? `where pf.processo_id = ${idProcesso}` : ''
  // return await Processos.findAll()
  let queryString = `SELECT 
  pf.id AS processo_facturacao_id,
  pf.processo_id,
  pf.horas AS processo_horas,  
  FORMAT(pf.custo, 2, 'pt_PT') AS processo_custo,  
  pf.status AS processo_facturacao_estado,
  DATE_FORMAT(pf.created_at, '%d/%m/%Y %H:%i') AS processo_facturacao_data_registo,
  p.ref AS processo_ref,
  p.n_processo_judicial AS processo_n_processo_judicial,
  p.assunto AS processo_assunto,
  FORMAT(p.valor_total, 2, 'pt_PT') AS processo_valor_total,
  p.horas_mes AS processo_horas_mes,
  (
    SELECT COUNT(*) FROM processo_factura_items pfi
    WHERE pfi.id = pf.id
) AS total_tarefas, 
  
  modo.descricao AS processo_modo_facturacao,
  p_estado.descricao AS processo_estado,
  c.denominacao AS cliente,
  cd.nome_completo AS colaborador

FROM processo_facturas pf
INNER JOIN processos p ON p.id = pf.processo_id
INNER JOIN processo_facturacao modo ON modo.id = p.modo_facturacao_id
INNER JOIN processo_estado p_estado ON p_estado.id = p.status_id
INNER JOIN clientes c ON c.id = pf.cliente_id
INNER JOIN colaboradores cd ON cd.id = pf.colaborador_id
${where}
order BY
pf.created_at desc`;
  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}


async function getFacturasByColaborador(id) {
  // return await Processos.findAll()
  let queryString = `SELECT 
  pf.id AS processo_facturacao_id,
  pf.processo_id,
  pf.horas AS processo_horas,  
  FORMAT(pf.custo, 2, 'pt_PT') AS processo_custo,  
  pf.status AS processo_facturacao_estado,
  DATE_FORMAT(pf.created_at, '%d/%m/%Y %H:%i') AS processo_facturacao_data_registo,
  p.ref AS processo_ref,
  p.n_processo_judicial AS processo_n_processo_judicial,
  p.assunto AS processo_assunto,
  FORMAT(p.valor_total, 2, 'pt_PT') AS processo_valor_total,
  p.horas_mes AS processo_horas_mes,
  (
    SELECT COUNT(*) FROM processo_factura_items pfi
    WHERE pfi.id = pf.id
) AS total_tarefas, 
  
  modo.descricao AS processo_modo_facturacao,
  p_estado.descricao AS processo_estado,
  c.denominacao AS cliente,
  cd.nome_completo AS colaborador
FROM processo_facturas pf
INNER JOIN processos p ON p.id = pf.processo_id
INNER JOIN processo_facturacao modo ON modo.id = p.modo_facturacao_id
INNER JOIN processo_estado p_estado ON p_estado.id = p.status_id
INNER JOIN clientes c ON c.id = pf.cliente_id
INNER JOIN colaboradores cd ON cd.id = pf.colaborador_id
  where cd.id = ${id}
order BY
pf.created_at desc`;

  return sequelize.query(queryString, {
    type: QueryTypes.SELECT
  });
}

/**
 * 
 * @param {*} idProcess 
 * @param {*} idCliente 
 * @param {*} idColaborador 
 * @returns 
 */
async function getHonorarios({idProcess, idCliente, idColaborador}) {
    // Construção dinâmica dos filtros
    const whereClauses = [];
    const replacements = {};
  
    if (idProcess) {
      whereClauses.push('p.id = :idProcess');
      replacements.idProcess = idProcess;
    }
  
    if (idCliente) {
      whereClauses.push('c.id = :idCliente');
      replacements.idCliente = idCliente;
    }
  
    if (idColaborador) {
      whereClauses.push('cd.id = :idColaborador');
      replacements.idColaborador = idColaborador;
    }
  
    const whereClause = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const queryString = `
    SELECT 
    pf.id AS processo_factura_id,
    pf.horas AS processo_factura_horas,
    pf.tipo_honorario,
    pf.status,
    FORMAT(pf.custo, 2, 'pt_PT') AS processo_factura_custo,
    p.ref AS processo_referencia, 
    p.n_processo_judicial AS processo_n_processo_judicial,
    modo.descricao AS processo_modo_facturacao,
    p_estado.descricao AS processo_estado,
    c.denominacao AS cliente,
    cd.nome_completo AS colaborador,
    DATE_FORMAT(pf.created_at, '%d/%m/%Y %H:%i') AS processo_factura_data_registo
    
  FROM processo_facturas pf

 INNER JOIN processos p ON p.id = pf.processo_id
 INNER JOIN processo_facturacao modo ON modo.id = p.modo_facturacao_id
 INNER JOIN processo_estado p_estado ON p_estado.id = p.status_id
 INNER JOIN clientes c ON c.id = pf.cliente_id
  INNER JOIN colaboradores cd ON cd.id = pf.colaborador_id
      ${whereClause}
      ORDER BY pf.created_at DESC;
    `;
  
    const results = await sequelize.query(queryString, {
      replacements,
      type: QueryTypes.SELECT
    });
  
    return results;

    /*

          SELECT 
        pf.id AS processo_factura_item_id,
        pf.horas AS processo_factura_item_horas,
        FORMAT(pf.custo, 2, 'pt_PT') AS processo_factura_item_custo,
        DATE_FORMAT(pt.data_inicio, '%d/%m/%Y %H:%i') AS data_registo_timesheet,
        tt.label AS tarefa,
        p.ref AS processo_referencia, 
        p.n_processo_judicial AS processo_n_processo_judicial,
        modo.descricao AS processo_modo_facturacao,
        p_estado.descricao AS processo_estado,
        c.denominacao AS cliente,
        cd.nome_completo AS colaborador,
        DATE_FORMAT(pf.created_at, '%d/%m/%Y %H:%i') AS processo_factura_item_data_registo

      FROM processo_factura_items pf
      INNER JOIN processos_timesheet pt ON pt.id = pf.processos_timesheet_id
      INNER JOIN tipos_tarefas tt ON tt.id = pt.tipo_evento_id
      INNER JOIN processos p ON p.id = pt.processo_id
      INNER JOIN processo_facturacao modo ON modo.id = p.modo_facturacao_id
      INNER JOIN processo_estado p_estado ON p_estado.id = p.status_id
      INNER JOIN clientes c ON c.id = pt.cliente_id
      INNER JOIN colaboradores cd ON cd.id = pt.colaborador_id
      */
  }

  
/**
 * 
 * @param {*} id
 * @returns 
 */
async function getHonorariosInvoice(id) {

  const processoFatura = await ProcessoFacturas.findByPk(id)

  if(!processoFatura) throw new Error("Honorário not found")

  const whereClauses = [];
  const replacements = {};

  if (id) {
    whereClauses.push('p.id = :id');
    replacements.id = id;
  }

  const whereClause = `WHERE ${whereClauses}`;

  const queryString = `
  SELECT 
  pf.id AS processo_factura_id,
  pf.horas AS processo_factura_horas,
  pf.tipo_honorario,
  pf.status,
  pf.custo AS processo_factura_custo,
  p.ref AS processo_referencia, 
  p.n_processo_judicial AS processo_n_processo_judicial,
  modo.descricao AS processo_modo_facturacao,
  p_estado.descricao AS processo_estado,
  c.denominacao AS cliente,
  c.nif as clienteNif,
  c.contacto_cobranca as clienteContacto,
  cd.nome_completo AS colaborador,
  DATE_FORMAT(pf.created_at, '%d/%m/%Y %H:%i') AS processo_factura_data_registo
  
FROM processo_facturas pf

INNER JOIN processos p ON p.id = pf.processo_id
INNER JOIN processo_facturacao modo ON modo.id = p.modo_facturacao_id
INNER JOIN processo_estado p_estado ON p_estado.id = p.status_id
INNER JOIN clientes c ON c.id = pf.cliente_id
INNER JOIN colaboradores cd ON cd.id = pf.colaborador_id
    ${whereClause}
    ORDER BY pf.created_at DESC;
  `;

  const results = await sequelize.query(queryString, {
    replacements,
    type: QueryTypes.SELECT
  });

  return results;

}


/**
 * 
 * @param {*} id
 * @param {*} userId
 * @returns 
 */
async function approveHonorariosInvoice(id, userId) {

    const object = ProcessoFacturas.findByPk(id)

    if(!object) throw new Error("Honorário not found")

    await ProcessoFacturas.update({
      status: "pago"
    },
    {
      where: {id}
    }
  )

}
module.exports = {
  ProcessoFacturas,
  createProcessoFactura,
  getProcessoFacturasByClienteId,
  getProcessoFacturasById,
  getAllFacturas,
  getFacturasByColaborador,
  getHonorarios,
  getHonorariosInvoice,
  approveHonorariosInvoice
};
