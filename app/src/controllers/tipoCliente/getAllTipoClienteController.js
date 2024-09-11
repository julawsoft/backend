const listTipoCliente = require("../../services/tipoCliente /listTipoCliente")

async function getAllTipoClienteController(req, res) {

        try {
                const listTipoClienteData = await listTipoCliente()
                return res.send(listTipoClienteData).status(200)
        } catch (e) {
                return e
        }
}

module.exports = getAllTipoClienteController