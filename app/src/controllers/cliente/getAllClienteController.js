const getAllCliente = require('../../services/cliente/getAllCliente.js')

async function getAllClienteController(req, res) {

        try {
                const listClienteData = await getAllCliente()
                return res.send(listClienteData).status(200)
        } catch (e) {
                return res.send(e.getMessage()).status(400)
        }

}


module.exports = getAllClienteController