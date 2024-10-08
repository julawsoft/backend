const { getAllByKeyValue } = require("../../persistencia/models/Colaborador");
const getAllByKeyValueDadosContacto = require("../dadoContacto/getAllByKeyValueDadosContacto");
const getAllByKeyValueDadosIdentificacao = require("../dadoIdentificacao/getAllByKeyValueDadosIdentificacao");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueColaborador(chave, valor) {
  const listColaborador = await getAllByKeyValue(chave, valor);

  let oneColab = listColaborador[0].dataValues;
  let colaboradorDTO = [];

  if (oneColab) {
    let tipoColaborador = await listTipoColaboradorById(oneColab.id);
    let dadosIdentificacao = await getAllByKeyValueDadosIdentificacao(
      "colaborador_id",
      oneColab.id
    );
    let dadosContactos = await getAllByKeyValueDadosContacto(
      "colaboradorId",
      oneColab.id
    );

    colaboradorDTO.push({
      ...oneColab,
      tipo: tipoColaborador ?? {},
      identificacoes: dadosIdentificacao ?? [],
      contactos: dadosContactos ?? [],
    });
  }

  return colaboradorDTO;
}

module.exports = getAllByKeyValueColaborador;
