const { getAllByKeyValue } = require("../../persistencia/models/DadosIdentificacao")

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueDadosIdentificacao(chave, valor) {
        return getAllByKeyValue(chave, valor)
}

module.exports = getAllByKeyValueDadosIdentificacao