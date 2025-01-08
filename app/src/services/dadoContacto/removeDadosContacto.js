const { deleteDadosContactoByColaborado } = require("../../persistencia/models/DadosContacto")

/**
* @param {number} colaboradorId
*
* @returns {Array} DadosContacto
*/
async function removeDadosContactoByColaborador (colaboradorId) { 
        const rsDelete = await deleteDadosContactoByColaborado(colaboradorId)
        return rsDelete
}

module.exports = removeDadosContactoByColaborador