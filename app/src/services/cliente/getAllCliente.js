const { getAll } = require("../../persistencia/models/Cliente.js")
const listByIdTipoCliente = require("../tipoCliente /listByIdTipoCliente.js")

/**
 * @returns {Object} clienteDTO
*/
async function getAllCliente() {

    try {
        const listClienteData = await getAll()
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

module.exports = getAllCliente