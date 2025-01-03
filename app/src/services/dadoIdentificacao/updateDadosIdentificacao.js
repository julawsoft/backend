const { update } = require("../../persistencia/models/DadosIdentificacao")
const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador")
const listByIdTipoIdentificacao = require("../tipoIdentificacao/listByIdTipoIdentificacao.js")

/**
* @param {number} tipo
* @param {string} valor
* @param {string} dataEmissao
* @param {string} dataValidade
* @param {number} colaboradorId
*
* @returns {Array} DadosContacto
*/
async function updateDadosIdentificacao (
    {
        tipoDocumentoId,
        valor,
        dataEmissao,
        dataValidade,
        colaboradorId
    }
) { 
        const newDadosIdentificacao = await update({
            "tipoDocumentoId": tipoDocumentoId,
            "valor": valor,
            "dataEmissao": dataEmissao,
            "dataValidade": dataValidade,
            "colaboradorId": colaboradorId
        })

        let colaborador = await  getAllByKeyValueColaborador("id", newDadosIdentificacao.dataValues.colaborador_id)
        let tipoDocumento = await  listByIdTipoIdentificacao(parseInt(newDadosIdentificacao.dataValues.tipo_documento_id))

        return {...newDadosIdentificacao.dataValues, coloborador: colaborador, tipo: tipoDocumento}   
}

module.exports = updateDadosIdentificacao