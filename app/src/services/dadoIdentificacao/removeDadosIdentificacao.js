const { deleteDadosContactoByColaborado } = require("../../persistencia/models/DadosContacto")
const { deleteDadosIdentificacaoByColaborador } = require("../../persistencia/models/DadosIdentificacao")

/**
* @param {number} colaboradorId
*
* @returns {Array} DadosContacto
*/
async function removeDadosIdentificacaoByColaborador(colaboradorId) { 
        
        const rsDelete = await deleteDadosIdentificacaoByColaborador(colaboradorId)

        return rsDelete
}

module.exports = removeDadosIdentificacaoByColaborador