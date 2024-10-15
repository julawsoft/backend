const { validationResult } = require('express-validator');
const createCliente = require('../../services/cliente/createCliente');
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente');

const defaultENUN = ['taxa_horaria']

const { StatusCodes } = require('http-status-codes');
const {errosConst, DADOS_CUSTO_FINANCEIRO} = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const createDadosCustoFinanceiro = require('../../services/dadoIdentificacao/createDadosCustoFinanceiro');

async function createDadosCustoFinanceiroController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body

                const dataReturned = await createDadosCustoFinanceiro(
                        {
                                "taxaHoraria": dataBody.taxa_horaria
                        }
                )

                return responseHttp(res, StatusCodes.CREATED, DADOS_CUSTO_FINANCEIRO.DADOS_CUSTO_FINANCEIRO_CREATED, dataReturned, [])

        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, DADOS_CUSTO_FINANCEIRO.DADOS_CUSTO_FINANCEIRO_ERROR_CREATED, {}, e.message)
        }
}


module.exports = createDadosCustoFinanceiroController