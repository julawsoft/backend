const getAllByKeyValueColaborador = require('../../services/colaborador/getAllByKeyValueColaborador.js');
const logger = require('../../utils/logger/logger.js');
const responseHttp = require('../../utils/http/response.js')
const { StatusCodes } = require('http-status-codes')
const { COLABORADOR } = require('../../utils/http/erros.Const.js');
const ColaboradorService = require('../../services/colaborador/ColaboradorService.js');


async function getListColaboradorController(req, res) {

        const response = await ColaboradorService.getTipoColaboradores()
        return responseHttp(res, response.status, response.message, response.data, [])
}

module.exports = getListColaboradorController