const { getAllByKeyValue } = require("../../persistencia/models/DadosIdentificacao")
const listByIdTipoIdentificacao = require("../tipoIdentificacao/listByIdTipoIdentificacao")

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueDadosIdentificacao(chave, valor) {
       
        const dadosIdentificacao = await getAllByKeyValue(chave, valor)

        const dadosIdentificacaoDTO = Array()
        for (identificacao of dadosIdentificacao) {
                const dadosTipoIdenticacao = await listByIdTipoIdentificacao(identificacao.dataValues.tipo_documento_id)
                dadosIdentificacaoDTO.push({...identificacao.dataValues, tipo: dadosTipoIdenticacao})
        }
        return dadosIdentificacaoDTO
        
}

module.exports = getAllByKeyValueDadosIdentificacao