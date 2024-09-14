const { validationResult } = require('express-validator');
const createCliente = require('../../services/cliente/createCliente');
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente');

const defaultENUN = ['telefone', 'e-mail', 'endereco', 'outro']

const { StatusCodes } = require('http-status-codes');
const errosConst = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const createDadosContacto = require('../../services/dadoContacto/createDadosContacto');

async function createDadosContactoController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body
                
                // const clienteData = await getAllByKeyValueD("nif", dataBody.nif)
                if (!defaultENUN.includes(dataBody.tipo)) return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.DADO_CONTACTO_TIPO_ERRO, {}, [defaultENUN])

                const dataReturned = await createDadosContacto(
                        {
                                "tipo": dataBody.tipo,
                                "valor": dataBody.valor,
                                "descricao": dataBody.descricao,
                                "colaboradorId": dataBody.colaborador_id
                        }
                )
            
                return responseHttp(res, StatusCodes.CREATED, errosConst.CLIENT_ERROR_CREATE, dataReturned, [])

        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE, {}, e.message)
        }
}


module.exports = createDadosContactoController