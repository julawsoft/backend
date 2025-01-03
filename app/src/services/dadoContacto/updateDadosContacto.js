const { update } = require("../../persistencia/models/DadosContacto")
const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador")
/**
* @param {number} tipo
* @param {string} valor
* @param {string} descricao
* @param {number} colaboradorId
*
* @returns {Array} DadosContacto
*/
async function updateDadosContacto (
    {
        tipo,
        valor,
        descricao,
        colaboradorId
    }
) { 
        const newDadosContacto = await update({
            "tipo": tipo,
            "valor": valor,
            "colaboradorId": colaboradorId
        })

        let colaborador = await  getAllByKeyValueColaborador("id", newDadosContacto.colaboradorId)
        return {...newDadosContacto.dataValues, coloborador: colaborador}   
}

module.exports = updateDadosContacto