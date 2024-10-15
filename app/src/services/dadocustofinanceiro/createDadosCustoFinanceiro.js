const { create } = require("../../persistencia/models/DadosCustoFinanceiro")
const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador")
/**
* @param {number} taxaHoraria
*
* @returns {Array} DadosCustoFinanceiro
*/
async function createDadosCustoFinanceiro (
    {
        taxaHoraria,
        colaboradorId
    }
) { 
        const newDadosCustoFinanceiro = await create({
            taxaHoraria,
            colaboradorId
        })

        let colaborador = await  getAllByKeyValueColaborador("id", newDadosCustoFinanceiro.colaboradorId)
        return {...newDadosCustoFinanceiro.dataValues, coloborador: colaborador}   
}

module.exports = createDadosCustoFinanceiro