const responseHttp = require('../../utils/http/response');
const ProcessoEquipasService = require('../../services/processos/ProcessoEquipasService');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const ProcessoServive = require('../../services/processos/ProcessoService');
const ProcessoTimeSheetService = require('../../services/processos/ProcessoTimeSheetService');

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
                                "dadosImportantes": dataBody.dadosImportantes,
                                "dataInicio": dataBody.dataInicio,
                                "dataFim": dataBody.dataFim,
                                "horas": dataBody.horas,
                        }
                )
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getProcessoTimeSheetByProcessoId(req, res) {

                const { idProcesso } = req.params

                if(!idProcesso){
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, [''])
                }
                const responseProcesso = await ProcessoServive.getByIdProcesso(idProcesso)

                console.log(responseProcesso)
                if(responseProcesso.status !== StatusCodes.OK)
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, ['Processo not found'])

                const response = await ProcessoTimeSheetService.getProcessoTimeSheetByProcessoId(idProcesso)
                
                return responseHttp(res, response.status, response.message, response.data, [])
        }
         
}

module.exports = ProcessoTimeSheetController;
