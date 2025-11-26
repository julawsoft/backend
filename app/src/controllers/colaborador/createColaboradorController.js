const createColaborador = require('../../services/colaborador/createColaborador.js')
const { validationResult } = require('express-validator');
const responseHttp = require('../../utils/http/response.js');
const { StatusCodes } = require('http-status-codes');
const { errosConst, COLABORADOR } = require('../../utils/http/erros.Const.js');
const createDadosContacto = require('../../services/dadoContacto/createDadosContacto.js');
const logger = require('../../utils/logger/logger.js');
const createDadosIdentificacao = require('../../services/dadoIdentificacao/createDadosIdentificacao.js');
const createDadosCustoFinanceiro = require('../../services/dadocustofinanceiro/createDadosCustoFinanceiro.js');

async function createColaboradorController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body
                // verificar o tipo de colaborador Id
                // verificar a funcao

                // levar as function para o service ou crie um use-case
                const dataReturned = await createColaborador({
                        username: dataBody.userName,
                        nomeCompleto: dataBody.nomeCompleto,
                        nomeProfissional: dataBody.nomeProfissional,
                        inicial: dataBody.inicial,
                        funcao: dataBody.funcao,
                        tipoColaboradorId: dataBody.tipoColaboradorId,
                        dataNascimento: dataBody.dataNascimento,
                        status: dataBody.status,
                        taxaHoraria: dataBody.taxaHoraria || null,
                        contactoPessoal: dataBody.contactoPessoal,
                        contactoEmergencia: dataBody.contactoEmergencia || null,
                        nIdentificacao: dataBody.nIdentificacao,
                        nCedulaOrdem: dataBody.nCedulaOrdem || null,
                        emailPessoal: dataBody.emailPessoal || null,
                        emailCorporativo: dataBody.emailCorporativo || null,
                        categoriaId: dataBody.categoriaId
                });

                if (dataReturned.status === StatusCodes.CREATED) {
                        return responseHttp(res, dataReturned.status, dataReturned.message, dataReturned.data, [])
                } else {
                        return responseHttp(res, dataReturned.status, dataReturned.message, dataReturned, dataReturned.message)
                }

        } catch (e) {
                logger.error({
                        label: "error", message: `${COLABORADOR.COLABORADOR_ERROR_CREATED} : ${e.message}`
                })
                return responseHttp(res, StatusCodes.BAD_REQUEST, e, {}, e.message ?? e)
        }
}

module.exports = createColaboradorController