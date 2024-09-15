const { validationResult } = require('express-validator');
const createCliente = require('../../services/cliente/createCliente');
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente');

const defaultENUN = ['telefone', 'e-mail', 'endereco', 'outro']

const { StatusCodes } = require('http-status-codes');
const {errosConst, DADOS_IDENTIFICACAO} = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const createDadosContacto = require('../../services/dadoContacto/createDadosContacto');
const createDadosIdentificacao = require('../../services/dadoIdentificacao/createDadosIdentificacao');

async function createDadosIdentificacaoController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body

                const dataReturned = await createDadosIdentificacao(
                        {
                                "tipoDocumentoId": dataBody.tipo_documento_id,
                                "valor": dataBody.valor,
                                "dataEmissao": dataBody.data_emissao,
                                "dataValidade": dataBody.data_validade,
                                "colaboradorId": dataBody.colaborador_id
                        }
                )

                return responseHttp(res, StatusCodes.CREATED, DADOS_IDENTIFICACAO.DADOS_IDENTIFICACAO_CREATED, dataReturned, [])

        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, DADOS_IDENTIFICACAO.DADOS_IDENTIFICACAO_ERROR_CREATED, {}, e.message)
        }
}


module.exports = createDadosIdentificacaoController