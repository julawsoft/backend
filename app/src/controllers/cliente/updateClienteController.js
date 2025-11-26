const createCliente = require('../../services/cliente/createCliente.js')
const { validationResult } = require('express-validator');
const updateCliente = require('../../services/cliente/updateCliente.js');

async function updateClienteController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const {id} = req.params
                const data = req.body
                let result = await updateCliente( id, data);
                return res.send(result[0])
        } catch (e) {

        }


}


module.exports = updateClienteController