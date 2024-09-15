const createColaborador = require('../../services/colaborador/createColaborador.js')
const { validationResult } = require('express-validator');
const responseHttp = require('../../utils/http/response.js');
const { StatusCodes } = require('http-status-codes');
const {errosConst, COLABORADOR} = require('../../utils/http/erros.Const.js');


async function createColaboradorController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body

                const dataReturned = await createColaborador(
                        {
                                "nomeCompleto": dataBody.nome_completo,
                                "nomeProfissional": dataBody.nome_profissional,
                                "dataNascimento": dataBody.data_nascimento,
                        }
                )
                return responseHttp(res, StatusCodes.CREATED, COLABORADOR.COLABORADOR_CREATED, dataReturned, [])
        } catch (e) {
                console.log("controller >>> ",e)
                return responseHttp(res, StatusCodes.BAD_REQUEST, COLABORADOR.COLABORADOR_ERROR_CREATED, {}, e.message)
        }

}


module.exports = createColaboradorController