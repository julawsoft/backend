const getAllByKeyValueColaborador = require('../../services/colaborador/getAllByKeyValueColaborador.js');
const logger = require('../../utils/logger/logger.js');
const responseHttp = require('../../utils/http/response.js')
const { StatusCodes } = require('http-status-codes')
const { COLABORADOR } = require('../../utils/http/erros.Const.js')


async function getByIdColaboradorController(req, res) {

        try {
                let {id} = req.params;
                const responseColabData =  await getAllByKeyValueColaborador("id", id)
                console.log("responseColabData", responseColabData)

                return responseHttp(res, StatusCodes.OK, COLABORADOR.COLABORADOR_LIST_ALL, responseColabData, [])
        } catch (e) {
                logger.error(e.message)
                return responseHttp(res, StatusCodes.BAD_REQUEST, COLABORADOR.COLABORADOR_ERROR_LIST_ALL, {}, e.message)
        }
}

module.exports = getByIdColaboradorController