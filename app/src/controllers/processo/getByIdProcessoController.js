const { validationResult } = require('express-validator');

const { StatusCodes } = require('http-status-codes');
const errosConst = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const ProcessoServive = require('../../services/processos/ProcessoService');

async function getByIdProcessoController(req, res) {

                const {id} = req.params

                const response = await ProcessoServive.getByIdProcesso(id)
        return responseHttp(res, response.status, response.message, response.data, [])

}


module.exports = getByIdProcessoController