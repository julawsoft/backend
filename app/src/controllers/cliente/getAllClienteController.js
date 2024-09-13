const { StatusCodes } = require('http-status-codes')
const getAllCliente = require('../../services/cliente/getAllCliente.js')
const errosConst = require('../../utils/http/erros.Const.js')
const responseHttp = require('../../utils/http/response.js')

async function getAllClienteController(req, res) {
        try {
                const listClienteData = await getAllCliente()
                return responseHttp(res, StatusCodes.OK, errosConst.SUCCESS, listClienteData, [])
        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.ERROR, {}, e.message)
        }
}


module.exports = getAllClienteController