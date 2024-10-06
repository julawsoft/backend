const createCliente = require('../../services/cliente/createCliente.js')
const { validationResult } = require('express-validator');
const updateCliente = require('../../services/cliente/updateCliente.js');

async function updateClienteController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                const data = req.body
                console.log("data", data);

                let result = await updateCliente(data);

                return res.send(result[0])
        } catch (e) {

        }


}


module.exports = updateClienteController