const updateColaborador = require('../../services/colaborador/updateColaborador.js');
const { validationResult } = require('express-validator');

async function updateColaboradorController(req, res) {

        try {
                const errors = validationResult(req);
                // if (!errors.isEmpty()) {
                //     return res.status(400).json({ errors: errors.array() });
                // }

                const data = req.body
                console.log("data", data)

                const result = await updateColaborador(data);

                return res.send(result)
        } catch (e) {

        }


}


module.exports = updateColaboradorController