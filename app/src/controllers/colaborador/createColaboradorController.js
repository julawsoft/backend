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
                console.log("dataBody", dataBody)
                // verificar o tipo de colaborador Id
                // verificar a funcao

                // levar as function para o service ou crie um use-case
                const dataReturned = await createColaborador(
                        {
                                "username": dataBody.username,
                                "nomeCompleto": dataBody.nome_completo,
                                "nomeProfissional": dataBody.nome_profissional,
                                "dataNascimento": dataBody.data_nascimento,
                                "funcao": dataBody.funcao,
                                "tipoColaboradorId": dataBody.tipo_colaborador_id,
                                "taxa_horaria": dataBody.taxa_horaria ?? null,
                                "status": dataBody.status
                        }
                )

                console.log("dataReturned >>> ", dataReturned)

                if (dataReturned.status === StatusCodes.CREATED) {


                        if (dataBody.contactos && dataBody.contactos.length) {
                                for (let contactos of dataBody.contactos) {
                                        createDadosContacto({
                                                "tipo": contactos.tipo,
                                                "valor": contactos.valor,
                                                "descricao": contactos.descricao,
                                                "colaboradorId": dataReturned.data.id
                                        })
                                }
                        }

                        if (dataBody.identificacoes && dataBody.identificacoes.length) {
                                for (let identificacoes of dataBody.identificacoes) {
                                        createDadosIdentificacao({
                                                "tipoDocumentoId": identificacoes.tipo,
                                                "valor": identificacoes.valor,
                                                "dataEmissao": identificacoes.data_emissao,
                                                "dataValidade": identificacoes.data_validade,
                                                "colaboradorId": dataReturned.data.id
                                        })
                                }
                        }

                        return responseHttp(res, dataReturned.status, dataReturned.message, dataReturned, [])
                }else{
                        return responseHttp(res, dataReturned.status, dataReturned.message, dataReturned, dataReturned.message)
                }

        } catch (e) {
                console.log("error >>> here... ", e)
                logger.error({
                        label: "error", message: `${COLABORADOR.COLABORADOR_ERROR_CREATED} : ${e.message}`
                })
                return responseHttp(res, StatusCodes.BAD_REQUEST, e, {}, e.message ?? e)
        }
}

module.exports = createColaboradorController