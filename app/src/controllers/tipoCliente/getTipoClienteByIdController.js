const listByIdTipoCliente = require("../../services/tipoCliente /listByIdTipoCliente")

async function getByIdTipoClienteController(req, res) {

        try {
                let {id} = req.params
                const listTipoCliente  = await listByIdTipoCliente(id)
                return res.send(listTipoCliente).status(200)
        } catch (e) {
                return res.send("Error").status(400)
        }

}


module.exports = getByIdTipoClienteController