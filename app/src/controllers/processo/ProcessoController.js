const responseHttp = require('../../utils/http/response');
const ProcessoEquipasService = require('../../services/processos/ProcessoEquipasService');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const ProcessoServive = require('../../services/processos/ProcessoService');
const ProcessoFacturasServive = require('../../services/processos/ProcessoFacturas');

class ProcessoController {

        async addRecursosProcesso(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }


                const dataBody = req.body
                const response = await ProcessoServive.addRecursosProcesso(
                        {
                                "processoId": dataBody.processoId,
                                "precedentes": dataBody.precedentes ? dataBody.precedentes : null,
                                "equipas": dataBody.colaboradoresId ? dataBody.colaboradoresId : null,
                                "tarefas": dataBody.tarefas ? dataBody.tarefas : null,
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async addAnexoProcesso(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body
                const response = await ProcessoServive.addAnexoProcesso(
                        {
                                "processoId": dataBody.processoId,
                                "colaboradorId": dataBody.colaboradorId,
                                "anexos": dataBody.anexos,
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async updateProcesso(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const { id } = req.params
                const dataBody = req.body

                let processoFinded = await ProcessoServive.getByIdProcesso(id)

                if (!processoFinded) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.PROCESSO_NOT_FOUND, {}, [])
                }

                if (Number(dataBody.modoFacturacaoId) == 1 && dataBody.horasMes == "") {
                        return responseHttp(
                                res,
                                StatusCodes.BAD_REQUEST,
                                errosConst.VALIDATION_ERROR,
                                {},
                                "Para modo de facturação Avença, as horas/meses deve ser preenchida!"
                        )
                }
                if (Number(dataBody.modoFacturacaoId) == 2 && dataBody.valorTotal == "") {
                        return responseHttp(
                                res,
                                StatusCodes.BAD_REQUEST,
                                errosConst.VALIDATION_ERROR,
                                {},
                                "Para modo de facturação Success Fee, a valor total deve ser preenchida"
                        )
                }
                if (Number(dataBody.modoFacturacaoId) == 3 && dataBody.valorTotal == "") {
                        return responseHttp(
                                res,
                                StatusCodes.BAD_REQUEST,
                                errosConst.VALIDATION_ERROR,
                                {},
                                "Para modo de facturação Fixo, a valor total deve ser preenchida"
                        )
                }

                const response = await ProcessoServive.updateProcesso(
                        {
                                "processoId": id,
                                "assunto": dataBody.assunto,
                                "area": dataBody.area,
                                "fase": dataBody.fase,
                                "instituicaoId": dataBody.instituicaoId,
                                "modoFacturacaoId": dataBody.modoFacturacaoId,
                                "clienteId": dataBody.clienteId,
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
                                "horasMes": dataBody.horasMes,
                                "valorTotal": dataBody.valorTotal,
                                "dataEmissaoFactura": dataBody.dataEmissaoFactura
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }


        async viewAnexoProcesso(req, res) {

                const { id } = req.params
                const response = await ProcessoServive.viewAnexoProcesso(
                        {
                                "processoId": id
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async downloadAnexoProcesso(req, res) {

                const { id } = req.params
                const response = await ProcessoServive.viewAnexoProcesso(
                        {
                                "processoId": id
                        }
                )

                console.log(response)
                return res.download(response.data.path, response.data.fileName, (err) => {
                        if (err) {
                                console.log('Erro ao enviar o arquivo:', err);
                        }
                })
        }

        async removeRecursosProcesso(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body
                const response = await ProcessoServive.removeRecursosProcesso(
                        {
                                "type": dataBody.type,
                                "valueId": dataBody.valueId
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async updateTarefaProcesso(req, res) {

                let id = req.params.id
                const dataBody = req.body

                let tarefaFinded = await ProcessoServive.getTaregaById(id)
                if (!tarefaFinded.data)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Tarefa não encontrada", [], [])

                const response = await ProcessoServive.updateTarefaProcesso({
                        "id": id,
                        "descricao": dataBody.descricao ?? tarefaFinded.data[0].descricao,
                        "status": dataBody.status ?? tarefaFinded.data[0].status,
                        data_para_realizacao: dataBody.data_para_realizacao ?? tarefaFinded.data[0].data_para_realizacao,
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getProcessoByColaborador(req, res) {
                let id = req.params.id
                let response = await ProcessoServive.getProcessoByColaborador(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }

<<<<<<< HEAD
        async getTarefaByColaboradorId(req, res) {
                let id = req.params.id
                let response = await ProcessoServive.getTarefaByColaboradorId(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }


=======
        async createFacturaProcesso(req, res) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body

                let response = await ProcessoFacturasServive.createFacturaProcesso({
                        "": ""
                })
                return responseHttp(res, response.status, response.message, response.data, [])
        }
        
        
>>>>>>> SCRUM-47-DETALHES-CLIENTE
}

module.exports = ProcessoController;
