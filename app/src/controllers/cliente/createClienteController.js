const { validationResult } = require('express-validator');
const createCliente = require('../../services/cliente/createCliente');
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente');

const defaultStatus = "pending"

const {	StatusCodes } = require('http-status-codes')

async function createClienteController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                     return res.status(400).json({ errors: errors.array() });
                }
                const dataBody = req.body

                const clienteData = await getAllByKeyValueCliente("nif", dataBody.nif)
                if(clienteData.length) return res.status(StatusCodes.BAD_REQUEST).send("NIF do cliente já existe")

                const dataReturned = await createCliente(
                        {
                        "denominacao": dataBody.denominacao,
                        "tipoId": dataBody.tipo_id, 
                        "nif": dataBody.nif,
                        "endereco": dataBody.endereco,
                        "pessoaContacto": dataBody.pessoa_contacto,
                        "contactoCobranca": dataBody.contacto_cobranca,
                        "nota": dataBody.nota,
                        "status": dataBody.status ? dataBody.status : defaultStatus
                        }
                )
                return res.status(StatusCodes.CREATED).send(dataReturned)

        } catch (e) {
                console.log("sss >>>>>>>>>>>>>>   " , e.message)
                return res.send(e.message).statusCode(400)
        }
}


module.exports = createClienteController