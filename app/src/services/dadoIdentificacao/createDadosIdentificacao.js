const { create } = require("../../persistencia/models/DadosIdentificacao")
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
async function createDadosIdentificacao (
    {
        tipoDocumentoId,
        valor,
        dataEmissao,
        dataValidade,
        colaboradorId
    }
) { 
        const newDadosIdentificacao = await create({
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

module.exports = createDadosIdentificacao