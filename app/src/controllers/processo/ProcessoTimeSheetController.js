const responseHttp = require('../../utils/http/response');
const ProcessoEquipasService = require('../../services/processos/ProcessoEquipasService');
const { validationResult, header } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const ProcessoServive = require('../../services/processos/ProcessoService');
const ProcessoTimeSheetService = require('../../services/processos/ProcessoTimeSheetService');
const getAllByKeyValueColaborador = require('../../services/colaborador/getAllByKeyValueColaborador');

class ProcessoTimeSheetController {

        async createProcessoTimeSheet(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body
                const response = await ProcessoTimeSheetService.createProcessoTimeSheet(
                        {
                                "tipoEventoId": dataBody.tipoEventoId,
                                "colaboradorId": dataBody.colaboradorId,
                                "clienteId": dataBody.clienteId ?? null,
                                "processoId": dataBody.processoId,
                                "modoFacturacao": dataBody.modoFacturacao ?? null,
                                "taxaProcesso": dataBody.taxaProcesso ?? null,
                                "taxaColaborador": dataBody.taxaColaborador ?? null,
                                "descricao": dataBody.descricao,
                                "dadosImportantes": dataBody.dadosImportantes ?? '',
                                "dataInicio": dataBody.dataInicio,
                                "dataFim": dataBody.dataFim,
                                "horas": dataBody.horas,
                                "tarefaId": dataBody.tarefaId,
                        }
                )
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getProcessoAllTimeSheet(req, res) {
                const { colaboradorId } = req.query     
                const response = await ProcessoTimeSheetService.getProcessoTimeSheets(colaboradorId)
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getProcessoTimeSheetByProcessoId(req, res) {

                const { idProcesso } = req.params

                if(!idProcesso){
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, [''])
                }
                const responseProcesso = await ProcessoServive.getByIdProcesso(idProcesso)

                if(responseProcesso.status !== StatusCodes.OK)
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, ['Processo not found'])

                const response = await ProcessoTimeSheetService.getProcessoTimeSheetByProcessoId(idProcesso)
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }


        async getProcessoTimeSheetByColaboradorId(req, res) {

                const  {idProcesso, idColaborador}  = req.params

                if(!idProcesso){
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, ['Processo Id'])
                }

                if(!idColaborador){
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, ['Colaborador Id'])
                }

                const responseProcesso = await ProcessoServive.getByIdProcesso(idProcesso)
                if(responseProcesso.status !== StatusCodes.OK)
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, ['Processo not found'])
                
                const responseColaborador = await getAllByKeyValueColaborador("id", idColaborador)

                if(responseColaborador.length === 0)
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, ['Colaborador not found'])

                const response = await ProcessoTimeSheetService.getProcessoTimeSheetByProcessoIdAndColaboradorId(idProcesso, idColaborador)
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async processoTimeSheetNaoFacturado(req, res) {
                const  {idProcesso, idUser}  = req.query
                const response = await ProcessoTimeSheetService.getProcessoTimeSheetNaoFacturado(idProcesso, idUser)
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async updateProcessoTimeSheet(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const { idProcessoTimeSheet } = req.params
                const dataBody = req.body

                const response = await ProcessoTimeSheetService.updateProcessoTimeSheet(
                        {
                                "tipoEventoId": dataBody.tipoEventoId,
                                "colaboradorId": dataBody.colaboradorId,
                                "clienteId": dataBody.clienteId ?? null,
                                "processoId": dataBody.processoId,
                                "modoFacturacao": dataBody.modoFacturacao ?? null,
                                "taxaProcesso": dataBody.taxaProcesso ?? null,
                                "taxaColaborador": dataBody.taxaColaborador ?? null,
                                "descricao": dataBody.descricao,
                                "dadosImportantes": dataBody.dadosImportantes,
                                "dataInicio": dataBody.dataInicio,
                                "dataFim": dataBody.dataFim,
                                "horas": dataBody.horas,
                                "idProcessoTimeSheet": idProcessoTimeSheet
                        }
                )
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }


        async deleteProcessoTimeSheet(req, res) {

                const { idProcessoTimeSheet } = req.params

                const response = await ProcessoTimeSheetService.deleteProcessoTimeSheet(idProcessoTimeSheet)
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }
         
}

module.exports = ProcessoTimeSheetController;
