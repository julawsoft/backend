const responseHttp = require('../utils/http/response');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../utils/http/erros.Const');
const ProcessoTasksService = require('../services/processos/ProcessoTasksService');

class TasksController {

        async create(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, [
                                {
                                        "message": "Invalid request",
                                        "errorFields": errors.array().map((error => error.path + "|" + error.msg))
                                }]
                        )
                }
                // valiar depois os [clientes, gestores,colaboradores e tipo de tarefa]

                const dataBody = req.body
                const taskDTO = {
                        processoId: dataBody.processoId,
                        descricao: dataBody.descricao,
                        clienteId: dataBody.clienteId,
                        status: dataBody.status,
                        dataParaRealizacao: dataBody.dataParaRealizacao,
                        colaboradorId: dataBody.colaboradorId,
                        gestorId: dataBody.gestorId,
                        tipoTarefaId: dataBody.tipoTarefaId
                }
                const response = await ProcessoTasksService.createTask(
                        {
                                ...taskDTO
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async updateTask(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, [
                                {
                                        "message": "Invalid request",
                                        "errorFields": errors.array().map((error => error.path + "|" + error.msg))
                                }]
                        )
                }

                const { id } = req.params
                const dataBody = req.body
                const taskDTO = {
                        processoId: dataBody.processoId,
                        descricao: dataBody.descricao,
                        clienteId: dataBody.clienteId,
                        status: dataBody.status,
                        dataParaRealizacao: dataBody.dataParaRealizacao,
                        colaboradorId: dataBody.colaboradorId,
                        gestorId: dataBody.gestorId,
                        tipoTarefaId: dataBody.tipoTarefaId,
                        taskId: id
                }
                const response = await ProcessoTasksService.updateTask(
                        {
                                ...taskDTO
                        }
                )

                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async remove(req, res) {

                const { id } = req.params
                const response = await ProcessoTasksService.removeTask(
                        id
                )

                return responseHttp(res, response.status, response.message, response.data, [response.message])
        }

        async getAll(req, res) {
                try {
                        const { colaboradorId, processoId, clienteId, statusId, dataInicio, dataFim, tipoTarefa } = req.query
                        const response = await ProcessoTasksService.getAllTasks({
                                colaboradorId,
                                processoId,
                                clienteId,
                                statusId,
                                dataInicio,
                                dataFim,
                                tipoTarefa
                        })
                        return responseHttp(res, response.status, response.message, response.data, [])
                } catch (e) {
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async getById(req, res) {
                try {
                        const { id } = req.params
                        const response = await ProcessoTasksService.getByIdTask(id)
                        return responseHttp(res, response.status, response.message, response.data, [])
                } catch (e) {
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }

        async patchTask(req, res) {
                try {
                        const { id } = req.params
                        const dataBody = req.body
                        
                        const dataToPatch = {
                                status: dataBody.status,
                                dataRealizada: dataBody.dataRealizada,
                                dataAprovada: dataBody.dataAprovada,
                                taskId: id
                        }

                        const response = await ProcessoTasksService.patchTask({
                                ...dataToPatch
                        })
                        return responseHttp(res, response.status, response.message, response.data, [])

                } catch (e) {
                        return responseHttp(res, 500, e, {}, e.message)
                }
        }


}

module.exports = TasksController;
