const createCliente = require('../../services/Cliente/createCliente.js')
const { validationResult } = require('express-validator')

async function createColaboradoController(req, res) {

        try {
                const errors = validationResult(req);
                // if (!errors.isEmpty()) {
                //     return res.status(400).json({ errors: errors.array() });
                // }

                const data = req.body
                console.log("data", data)

                await createCliente(data)

                return res.send("POST SAVE...")
        } catch (e) {

        }


}


module.exports = createClienteController