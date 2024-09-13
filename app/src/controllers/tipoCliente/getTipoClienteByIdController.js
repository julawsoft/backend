const { StatusCodes } = require("http-status-codes")
const listByIdTipoCliente = require("../../services/tipoCliente /listByIdTipoCliente")
const responseHttp = require("../../utils/http/response")
const errosConst = require("../../utils/http/erros.Const")

async function getByIdTipoClienteController(req, res) {

        try {
                let {id} = req.params
                const listTipoCliente  = await listByIdTipoCliente(id)
                return responseHttp(res, StatusCodes.OK, errosConst.SUCCESS, listTipoCliente, [])
        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.ERROR, {}, e.message)
        }

}


module.exports = getByIdTipoClienteController