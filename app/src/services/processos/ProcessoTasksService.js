const { StatusCodes } = require("http-status-codes");
const {
    create,
    getAllTasks,
    getByIdTask,
    updateTask,
    removeTask,
    patchTask
} = require("../../persistencia/models/ProcessosTarefas");

class ProcessoTasksService {

    static async createTask({
        processoId,
        descricao,
        clienteId,
        status,
        dataParaRealizacao,
        colaboradorId,
        gestorId,
        tipoTarefaId
    }) {
        try {

            let response = await create({
                processoId,
                descricao,
                clienteId,
                status,
                dataParaRealizacao,
                colaboradorId,
                gestorId,
                tipoTarefaId,
            })
            return {
                data: response,
                message: "TASK.CREATE.SUCCESS",
                status: StatusCodes.CREATED,
            };

        } catch (e) {
            return {
                data: __filename,
                message: e.message,
                status: StatusCodes.BAD_REQUEST,
            };
        }
    }

    static async getByIdTask(
        taskId
    ) {
        try {
            let response = await getByIdTask(
                taskId
            )
            return {
                data: response,
                message: "TASK.LIST.BYID.SUCCESS",
                status: StatusCodes.OK,
            };

        } catch (e) {
            return {
                data: __filename,
                message: e.message,
                status: StatusCodes.BAD_REQUEST,
            };
        }
    }

    static async getAllTasks(
        {
            colaboradorId,
            processoId,
            clienteId,
            statusId,
            dataInicio,
            dataFim,
            tipoTarefa
        }
    ) {
        try {

            let response = await getAllTasks({
                colaboradorId,
                processoId,
                clienteId,
                statusId,
                dataInicio,
                dataFim,
                tipoTarefa
            })
            return {
                data: response,
                message: "TASK.LIST.SUCCESS",
                status: StatusCodes.OK,
            };

        } catch (e) {
            return {
                data: __filename,
                message: e.message,
                status: StatusCodes.BAD_REQUEST,
            };
        }
    }

    static async updateTask(
        {
            processoId,
            descricao,
            clienteId,
            status,
            dataParaRealizacao,
            colaboradorId,
            gestorId,
            tipoTarefaId,
            taskId
        }) {
        try {

            let response = await updateTask(taskId,
                {
                    "processo_id": processoId,
                    "descricao": descricao,
                    "cliente_id": clienteId,
                    "status": status,
                    "data_para_realizacao": dataParaRealizacao,
                    "colaborador_id": colaboradorId,
                    "gestor_id": gestorId,
                    "tipo_tarefa_id": tipoTarefaId,
                })
            return {
                data: response,
                message: "TASK.UPDATED.SUCCESS",
                status: StatusCodes.OK,
            };

        } catch (e) {
            return {
                data: __filename,
                message: e.message,
                status: StatusCodes.BAD_REQUEST,
            };
        }
    }
    static async removeTask(
        taskId
    ) {
        try {

            // veficar o status da task
            // verificar se nao esta afeta a um timesheet

            let response = await removeTask(taskId)
            return {
                data: response,
                message: "TASK.DELETED.SUCCESS",
                status: StatusCodes.OK,
            };

        } catch (e) {
            return {
                data: __filename,
                message: e.message,
                status: StatusCodes.BAD_REQUEST,
            };
        }
    }

    /**
    * Atualiza parcialmente uma tarefa (PATCH)
    * @param {Object} params
    * @param {string} params.status - Status da tarefa
    * @param {Date|null} params.dataRealizada - Data de realização
    * @param {Date|null} params.dataAprovada - Data de aprovação
    * @param {number} params.taskId - ID da tarefa
    * @returns {Object} Resultado da operação
    */
    static async patchTask({ status, dataRealizada = null, dataAprovada = null, taskId }) {
        try {
            if (!taskId) throw new Error('taskId é obrigatório');

            const tarefaAtualizada = await patchTask(taskId, {
                status,
                data_realizada: dataRealizada,
                data_aprovada: dataAprovada
            });

            return {
                data: tarefaAtualizada,
                message: "TASK.PATCH.SUCCESS",
                status: StatusCodes.OK,
            };

        } catch (e) {
            return {
                data: null,
                message: e.message,
                status: StatusCodes.BAD_REQUEST,
            };
        }
    }




}

module.exports = ProcessoTasksService;