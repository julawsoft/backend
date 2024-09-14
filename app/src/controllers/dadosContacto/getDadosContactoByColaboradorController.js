const responseHttp = require('../../utils/http/response.js')
const { StatusCodes } = require('http-status-codes')
const getAllByKeyValueDadosContacto = require('../../services/dadoContacto/getAllByKeyValueDadosContacto.js')
const errosConst = require('../../utils/http/erros.Const.js')

async function getDadosContactoByColaboradorController(req, res) {
        try {
                const {id} = req.params
                const listDadosContactos = await getAllByKeyValueDadosContacto("colaboradorId", id)
                return responseHttp(res, StatusCodes.OK, errosConst.SUCCESS, listDadosContactos, [])
        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.ERROR, {}, e.message)
        }
}
module.exports = getDadosContactoByColaboradorController