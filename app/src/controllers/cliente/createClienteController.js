const { validationResult } = require('express-validator');
const createCliente = require('../../services/cliente/createCliente');
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente');

const defaultStatus = "pending"

const { StatusCodes } = require('http-status-codes');
const errosConst = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');

async function createClienteController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body
                
                const clienteData = await getAllByKeyValueCliente("nif", dataBody.nif)
                if (clienteData.length) return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE_NIF, {}, ["Cliente already exists"])

                const clienteDataEmail = await getAllByKeyValueCliente("e_mail", dataBody.e_mail)
                if (clienteDataEmail.length) return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE_NIF, {}, ["E-mail cliente already exists"])
                        
                const dataReturned = await createCliente(
                        {
                                "denominacao": dataBody.denominacao,
                                "tipoId": dataBody.tipo_id,
                                "nif": dataBody.nif,
                                "endereco": dataBody.endereco,
                                "pessoaContacto": dataBody.pessoa_contacto,
                                "contactoCobranca": dataBody.contacto_cobranca,
                                "e_mail": dataBody.e_mail,
                                "nota": dataBody.nota,
                                "status": dataBody.status ? dataBody.status : defaultStatus
                        }
                )
            
                return responseHttp(res, StatusCodes.CREATED, errosConst.CLIENT_CREATED, dataReturned, [])

        } catch (e) {
                console.log("error save client ", e)
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE, {}, e.message)
        }
}


module.exports = createClienteController