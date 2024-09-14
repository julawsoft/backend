const { create } = require("../../persistencia/models/DadosContacto")

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
    
    console.log( {
        tipo,
        valor,
        descricao,
        colaboradorId
    })

        const newDadosContacto = await create({
            "tipo": tipo,
            "valor": valor,
            "descricao": descricao,
            "colaboradorId": colaboradorId
        })

        console.log("new .......", newDadosContacto)
        let colaborador = await  listByKeyValueColaborador("id", newDadosContacto.colaboradorId)
        return {...newDadosContacto.dataValues, coloborador: colaborador}   
}

module.exports = createDadosContacto