const { getAllByKeyValue } = require("../../persistencia/models/DadosCustoFinanceiro.js")

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueDadosCustoFinanceiro(chave, valor) {

    try {
        const listDados = await getAllByKeyValue(chave, valor)
        return listDados
    } catch (e) {
        return e
    }
}

module.exports = getAllByKeyValueDadosCustoFinanceiro