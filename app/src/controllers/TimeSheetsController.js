const responseHttp = require('../utils/http/response');
const ProcessoEquipasService = require('../services/processos/ProcessoEquipasService');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../utils/http/erros.Const');
const ProcessoServive = require('../services/processos/ProcessoService');
const ProcessoTimeSheetService = require('../services/processos/ProcessoTimeSheetService');

class TimeSheetsController {

        
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

                console.log("here ... ", req.body)

                const { id } = req.params
                const dataBody = req.body

                let processoFinded = await ProcessoServive.getByIdProcesso(id)

                if (!processoFinded) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.PROCESSO_NOT_FOUND, {}, [])
                }

                const facturaFinded = await ProcessoServive.getFacturas(id)
                if (dataBody.modoFacturacaoId !== '' && dataBody.modoFacturacaoId) {
                        if (facturaFinded.data.length > 0 && processoFinded.data[0].modo_facturacao_id != dataBody.modoFacturacaoId)
                                return responseHttp(
                                        res,
                                        StatusCodes.BAD_REQUEST,
                                        errosConst.PROCESSO_CANNOT_CHANGE_MODE,
                                        {},
                                        "Não é possível mudar o modo de facturação enquanto há facturas associadas!"
                                )
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
                                "dataEmissaoFactura": dataBody.dataEmissaoFactura,
                                "nProcessoJudicial": dataBody.nProcessoJudicial
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
                        "processo_id": dataBody.processoId,
                        "descricao": dataBody.descricao ?? tarefaFinded.data[0].descricao,
                        "data_para_realizacao": dataBody.dataParaRealizacao ?? tarefaFinded.data[0].data_para_realizacao,
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async concluirTarefaProcesso(req, res) {

                let id = req.params.id
                const dataBody = req.body

                let tarefaFinded = await ProcessoServive.getTaregaById(id)
                if (!tarefaFinded.data)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Tarefa não encontrada", [], [])
                if (!dataBody.status)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "O status do processo é necessário", [], [])

                if (dataBody.status == 1)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Tarefa precisa ser realizada, para conclui-lá", [], [])

                if (dataBody.status == 3)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Tarefa já foi aprovada", [], [])

                if (!dataBody.gestorId)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Gestor ID não informado", [], [])

                const response = await ProcessoServive.concluirTarefaProcesso(
                        id,
                        dataBody.gestorId,
                        dataBody.status,
                        new Date()
                )
                let tarefaFindedReturned = await ProcessoServive.getTaregaById(id)

                return responseHttp(res, response.status, response.message, tarefaFindedReturned.data, [])
        }

        async realizarTarefaProcesso(req, res) {

                let id = req.params.id
                const dataBody = req.body

                let tarefaFinded = await ProcessoServive.getTaregaById(id)
                if (!tarefaFinded.data)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Tarefa não encontrada", [], [])

                if (!dataBody.status || dataBody.status == 3)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Tarefa aprovada não pode ser alterada", [], [])

                if (!dataBody.colaboradorId)
                        return responseHttp(res, StatusCodes.NOT_FOUND, "Colaborador ID não informado", [], [])

                const response = await ProcessoServive.realizarTarefaProcesso(
                        id,
                        dataBody.colaboradorId,
                        dataBody.status,
                        new Date()
                )
                let tarefaFindedReturned = await ProcessoServive.getTaregaById(id)

                return responseHttp(res, response.status, response.message, tarefaFindedReturned.data, [])
        }


        async getProcessoByColaborador(req, res) {
                let id = req.params.id
                let response = await ProcessoServive.getProcessoByColaborador(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getTarefaByColaboradorId(req, res) {
                let id = req.params.id
                let response = await ProcessoServive.getTarefaByColaboradorId(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getAllTarefaByColaboradorId(req, res) {
                let id = req.params.id
                let response = await ProcessoServive.getAllTarefaByColaboradorId(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }


        async getListaProcessos(req, res) {
                let response = await ProcessoServive.getProcessoList()
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getFacturas(req, res) {

                const { id } = req.params
                let processoFinded = await ProcessoServive.getByIdProcesso(id)

                if (!processoFinded) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.PROCESSO_NOT_FOUND, {}, [])
                }

                const response = await ProcessoServive.getFacturas(id)

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async createTarefa(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body
                const response = await ProcessoServive.createTarefa(
                        {
                                "descricao": dataBody.descricao,
                                "processo_id": dataBody.processoId,
                                "colaborador_id": dataBody.colaboradorId,
                                "data_para_realizacao": dataBody.dataParaRealizacao,
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getAllInstituicoes(req, res) {
                const response = await ProcessoServive.getAllInstituicoes()
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getAllModoFacturacao(req, res) {
                const response = await ProcessoServive.getAllModoFacturacao()
                return responseHttp(res, response.status, response.message, response.data, [])
        }
        async getAllProcessoStatus(req, res) {
                const processoStatus = [
                        { descricao: 'Ativo', id: 1 },
                        { descricao: 'Proposta', id: 2 },
                        { descricao: 'Suspenso', id: 3 },
                        { descricao: 'Encerrado', id: 3 },
                      ];

                return responseHttp(res, 200, 'LIST.PROCESSO-STATUS.SUCESS', processoStatus,[])
        }



        async getAll(req, res) {
                try{

                        const {colaboradorId, clienteId, processoId, tarefaId, dataInicio, dataFim, statusId} =  req.query
                        const responseTimeSheets = await ProcessoTimeSheetService.getProcessoTimeSheets({
                                colaboradorId,
                                clienteId,
                                processoId,
                                tarefaId,
                                dataInicio,
                                dataFim,
                                statusId,
                        })
                        return responseHttp(res, responseTimeSheets.status, responseTimeSheets.message, responseTimeSheets.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async getAllByProcessoId(req, res) {
                try{
                        const {id} = req.params
                        console.log("id do processo ", id)
                        const responseTimeSheets = await ProcessoTimeSheetService.getProcessoTimeSheetByProcessoId(id)
                        return responseHttp(res, responseTimeSheets.status, responseTimeSheets.message, responseTimeSheets.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }
        
        async getAllByColaboradorId(req, res) {
                try{
                        const {id} = req.params
                        const responseTimeSheets = await ProcessoTimeSheetService.getProcessoTimeSheets({
                                colaboradorId: id
                        })
                        return responseHttp(res, responseTimeSheets.status, responseTimeSheets.message, responseTimeSheets.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async getAllByClienteId(req, res) {
                try{
                        const {id} = req.params
                        const responseTimeSheets = await ProcessoTimeSheetService.getAllByClienteId(id)
                        return responseHttp(res, responseTimeSheets.status, responseTimeSheets.message, responseTimeSheets.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async getById(req, res) {
                try{
                        const {id} = req.params
                        const responseTimeSheets = await ProcessoTimeSheetService.getById(id)
                        return responseHttp(res, responseTimeSheets.status, responseTimeSheets.message, responseTimeSheets.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async getAllTIpoTarefas(req, res) {
                try{
                        const responseTimeSheets = await ProcessoTimeSheetService.getAllTIpoTarefas()
                        return responseHttp(res, responseTimeSheets.status, responseTimeSheets.message, responseTimeSheets.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async processoTimeSheetNaoFacturado(req, res) {
                try{
                        const  {idProcesso, idUser}  = req.query
                        const response = await ProcessoTimeSheetService.getProcessoTimeSheetNaoFacturado(idProcesso, idUser)
                        return responseHttp(res, response.status, response.message, response.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }
        /** TOTAL TAREFAS  */
        async getTotalTarefas(req, res) {
                try{
                        const  {year, idUser}  = req.query
                        const response = await ProcessoTimeSheetService.getTotalTarefas(year, idUser)
                        return responseHttp(res, response.status, response.message, response.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }
        /** TOTAL PROJECTOS  */
        async getTotalProjectos(req, res) {
                try{
                        const  {year, idUser}  = req.query
                        const response = await ProcessoTimeSheetService.getTotalProjectos(year, idUser)
                        return responseHttp(res, response.status, response.message, response.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async changeStatus(req, res) {
                try{
                        const  {idTimeSheet, status}  = req.query
                        const response = await ProcessoTimeSheetService.changeStatus(idTimeSheet, status)
                        return responseHttp(res, response.status, response.message, response.data, [])
                }catch(e){
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }


}

module.exports = TimeSheetsController;
