const { validationResult } = require('express-validator');

const { StatusCodes } = require('http-status-codes');
const errosConst = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const ProcessoServive = require('../../services/processos/ProcessoService');

async function createProcessoController(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body

                const response = await ProcessoServive.createProcesso(
                        {
                                "assunto": dataBody.assunto,
                                "area": dataBody.area,
                                "fase": dataBody.fase,
                                "instituicaoId": dataBody.instituicaoId,
                                "modoFacturacaoId": dataBody.modoFacturacaoId,
                                "gestorId": dataBody.gestorId,
                                "contraParte": dataBody.contraParte,
                                "dataRegisto": dataBody.dataRegisto,
                                "dataSuspensao": dataBody.dataSuspensao,
                                "colaboradorIdSuspendeu": dataBody.colaboradorIdSuspendeu,
                                "dataEncerramento": dataBody.dataEncerramento,
                                "colaboradorIdEnderrou": dataBody.colaboradorIdEnderrou,
                                "metodologia": dataBody.metodologia,
                                "estrategia": dataBody.estrategia,
                                "factos": dataBody.factos,
                                "objectivos": dataBody.objectivos,
                                "dataImportantes": dataBody.dataImportantes,
                                "statusId": dataBody.statusId,
                                "precedentes": dataBody.precedentes,
                                "equipas": dataBody.equipas,
                                "tarefas": dataBody.tarefas,

                        }
                )
            
                return responseHttp(res, response.status, response.message, response.data, [])

}


module.exports = createProcessoController