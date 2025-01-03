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
async function updateColaborador({ id, nomeCompleto, nomeProfissional, dataNascimento, funcao, tipoColaboradorId, taxa_horaria, status }) {
        
    try {

        const dataToSave = {
            "nomeCompleto": nomeCompleto,
            "nomeProfissional": nomeProfissional,
            "dataNascimento": dataNascimento,
            "funcao": funcao,
            "tipoColaboradorId": tipoColaboradorId,
            "inicial":  makeInitialColaborador(nomeCompleto),
            taxa_horaria,
            status,
            id,
        }
        
        const dataColaborador = await update(dataToSave)
                
        return {
            data: dataColaborador,
            message: 'COLABORADOR.UPDATED',
            status: StatusCodes.OK,
          };
    }catch(e) {
        return {
            data: __filename,
            message: e.message,
            status: StatusCodes.BAD_REQUEST,
          };
    }

}

module.exports = updateColaborador;