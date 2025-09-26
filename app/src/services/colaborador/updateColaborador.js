const { StatusCodes } = require("http-status-codes");
const { ROLES } = require("../../const.js");
const { update } = require("../../persistencia/models/Colaborador.js");
const { makeInitialColaborador } = require("../../utils/string.js");

/**
* @param {string} username
* @param {string} nomeCompleto
* @param {string} nomeProfissional
* @param {string} dataNascimento
* @param {string} funcao
* @param {string} tipoColaboradorId
*
* @returns {Array} Colaborador
*/
async function updateColaborador({
    username,
    nomeCompleto,
    nomeProfissional,
    inicial,
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
    categoriaId,
    id
}) {

    try {

        const dataToSave = {
            username,
            nomeCompleto,
            nomeProfissional,
            funcao,
            tipoColaboradorId,
            dataNascimento,
            tokenReset,
            status,
            taxaHoraria: taxaHoraria == "" ? undefined : taxaHoraria,
            contactoPessoal,
            contactoEmergencia,
            nIdentificacao,
            nCedulaOrdem,
            emailPessoal,
            emailCorporativo,
            "uuid": Math.random().toString().slice(2) + new Date().getTime().toString(),
            // uuid: keyCloakColaborador.uuid.toString(),
            inicial: inicial ?? makeInitialColaborador(nomeCompleto),
            categoriaId,
            id,
        }

        const dataColaborador = await update(dataToSave)

        return {
            data: dataColaborador,
            message: 'COLABORADOR.UPDATED',
            status: StatusCodes.OK,
        };
    } catch (e) {
        return {
            data: __filename,
            message: e.message,
            status: StatusCodes.BAD_REQUEST,
        };
    }

}

module.exports = updateColaborador;