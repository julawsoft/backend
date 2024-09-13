const createCliente = require('../../services/cliente/createCliente.js')
const { validationResult } = require('express-validator')
const responseHttp = require('../../utils/http/response.js')
const { StatusCodes } = require('http-status-codes')
const errosConst = require('../../utils/http/erros.Const.js')
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente.js')

async function getByIdClienteController(req, res) {

        try {
                const {id} = req.params
                const listClienteData = await getAllByKeyValueCliente("id", id)
                return responseHttp(res, StatusCodes.OK, errosConst.SUCCESS, listClienteData, [])
        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.ERROR, {}, e.message)
        }

}

module.exports = getByIdClienteController