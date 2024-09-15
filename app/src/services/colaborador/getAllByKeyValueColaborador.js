const { getAllByKeyValue } = require("../../persistencia/models/Colaborador")

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueColaborador(chave, valor) {
        return getAllByKeyValue(chave, valor)
}

module.exports = getAllByKeyValueColaborador