const { getAll, getAllByKeyValue } = require("../../persistencia/models/Cliente.js")
const listByIdTipoCliente = require("../tipoCliente /listByIdTipoCliente.js")

/**
 * @returns {string} chave
 * @returns {string} valor
 */
async function getAllByKeyValueCliente(chave, valor) {

    try {
        const listClienteData = await getAllByKeyValue(chave, valor)
        const clienteDTO = Array()
        for (cliente of listClienteData) {
            let tipoCliente = await  listByIdTipoCliente(cliente.tipo_id)
            clienteDTO.push({...cliente.dataValues, tipo: tipoCliente})
        }
        return clienteDTO

    } catch (e) {
        return e
    }
}

module.exports = getAllByKeyValueCliente