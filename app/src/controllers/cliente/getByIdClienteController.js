const createCliente = require('../../services/cliente/createCliente.js')
const { validationResult } = require('express-validator')

async function getByIdClienteController(req, res) {

        try {
                const listClienteData = await getC()
                return res.send(listClienteData).status(200)
        } catch (e) {
                return res.send(e.getMessage()).status(400)
        }

}


module.exports = getByIdClienteController