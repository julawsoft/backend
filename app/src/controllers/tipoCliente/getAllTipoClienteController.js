const { StatusCodes } = require("http-status-codes")
const listTipoCliente = require("../../services/tipoCliente /listTipoCliente")
const errosConst = require("../../utils/http/erros.Const")
const responseHttp = require("../../utils/http/response")

async function getAllTipoClienteController(req, res) {
        try {
                const listTipoClienteData = await listTipoCliente()
                return responseHttp(res, StatusCodes.OK, errosConst.SUCCESS, listTipoClienteData, [])
        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.ERROR, {}, e.message)
        }
}
module.exports = getAllTipoClienteController