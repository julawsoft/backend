const responseHttp = require('../../utils/http/response.js')
const { StatusCodes } = require('http-status-codes')
const errosConst = require('../../utils/http/erros.Const.js')
const getAllByKeyValueDadosIdentificacao = require('../../services/dadoIdentificacao/getAllByKeyValueDadosIdentificacao.js')

async function getDadosIdentificacaoByColaboradorController(req, res) {
        try {
                const {id} = req.params
                const listDadosContactos = await getAllByKeyValueDadosIdentificacao("colaborador_id", id)
                return responseHttp(res, StatusCodes.OK, errosConst.SUCCESS, listDadosContactos, [])
        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.ERROR, {}, e.message)
        }
}
module.exports = getDadosIdentificacaoByColaboradorController