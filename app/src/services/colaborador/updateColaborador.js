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
async function updateColaborador({ id, nomeCompleto, nomeProfissional, dataNascimento, funcao, tipoColaboradorId }) {
        
        const dataToSave = {
            "nomeCompleto": nomeCompleto,
            "nomeProfissional": nomeProfissional,
            "dataNascimento": dataNascimento,
            "funcao": funcao,
            "tipoColaboradorId": tipoColaboradorId,
            "inicial":  makeInitialColaborador(nomeCompleto),
            id
        }

        const dataColaborador = await update({...dataToSave})
        return await { dataColaborador };

}

module.exports = updateColaborador;