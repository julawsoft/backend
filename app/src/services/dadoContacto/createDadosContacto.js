const { create } = require("../../persistencia/models/DadosContacto")
const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador")
/**
* @param {number} tipo
* @param {string} valor
* @param {string} descricao
* @param {number} colaboradorId
*
* @returns {Array} DadosContacto
*/
async function createDadosContacto (
    {
        tipo,
        valor,
        descricao,
        colaboradorId
    }
) { 
        const newDadosContacto = await create({
            "tipo": tipo,
            "valor": valor,
            "descricao": descricao,
            "colaboradorId": colaboradorId
        })

        let colaborador = await  getAllByKeyValueColaborador("id", newDadosContacto.colaboradorId)
        return {...newDadosContacto.dataValues, coloborador: colaborador}   
}

module.exports = createDadosContacto