const { getById } = require("../../persistencia/models/Colaborador");
const getAllByKeyValueDadosContacto = require("../dadoContacto/getAllByKeyValueDadosContacto");
const getAllByKeyValueDadosCustoFinanceiro = require("../dadocustofinanceiro/getAllByKeyValueDadosCustoFinanceiro");
const getAllByKeyValueDadosIdentificacao = require("../dadoIdentificacao/getAllByKeyValueDadosIdentificacao");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueColaborador(chave, valor) {
  const listColaborador = await getById(valor);
  return listColaborador.length ? listColaborador[0] : {};
}

module.exports = getAllByKeyValueColaborador;
