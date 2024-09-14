const { getAllByKeyValue } = require("../../persistencia/models/DadosContacto.js")
const listByIdTipoCliente = require("../tipoCliente /listByIdTipoCliente.js")

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueDadosContacto(chave, valor) {

    try {
        const listDados = await getAllByKeyValue(chave, valor)
        return listDados
    } catch (e) {
        return e
    }
}

module.exports = getAllByKeyValueDadosContacto