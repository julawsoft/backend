const { StatusCodes } = require("http-status-codes");
const { create, getAllOrByProcessoId, getAllOrByProcessoIdAndColaboradorId, 
    getAllByClienteId,
     updateProcessoTimeSheet, 
     removeProcessoTimeSheet, 
     getTimeSheetNaoFacturado, 
    getAllTimeSheets, 
    getById,getTotalTarefas, 
    getTotalProjectos,
    submeterTimeSheet 
} = require("../../persistencia/models/ProcessosTimeSheet");
const { getAllTiposTarefas } = require("../../persistencia/models/TiposTarefas");

class ProcessoTimeSheetService {

    static async createProcessoTimeSheet({
        tipoEventoId,
        colaboradorId,
        clienteId,
        processoId,
        modoFacturacao,
        taxaProcesso,
        taxaColaborador,
        descricao,
        dadosImportantes,
        dataInicio,
        dataFim,
        horas,
        tarefaId
    }) {
        try {

            const dataDTO = {
                "tipo_evento_id": tipoEventoId,
                "colaborador_id": colaboradorId,
                "cliente_id": clienteId,
                "processo_id": processoId,
                "modo_facturacao": modoFacturacao,
                "taxa_processo": taxaProcesso,
                "taxa_colaborador": taxaColaborador,
                "descricao": descricao,
                "dados_importantes": dadosImportantes,
                "data_inicio": dataInicio,
                "data_fim": dataFim,
                "horas": horas,
                "tarefa_id": tarefaId,
            }

            let response = await create(dataDTO)

            console.log(">>>>>>>>>>>>>>>>>>>", response)

            return {
                data: response,
                message: "TIMESHHET.PROCESSO.CREATED",
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

    static async getProcessoTimeSheetByProcessoId(idProcesso) {
        try {

            let response = await getAllOrByProcessoId(idProcesso)
            return {
                data: response,
                message: "TIMESHEET.PROCESSO.LIST",
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

    static async getProcessoTimeSheets({
        colaboradorId,
        clienteId,
        processoId,
        tarefaId,
        dataInicio,
        dataFim,
        statusId,
    }) {
        try {

            let response = await getAllTimeSheets({ 
                colaboradorId,
                clienteId,
                processoId,
                tarefaId,
                dataInicio,
                dataFim,
                statusId})
            return {
                data: response,
                message: "TIMESHEET.LIST",
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
    static async getAllByClienteId(idCliente) {
        try {

            let response = await getAllByClienteId(idCliente)
            return {
                data: response,
                message: "TIMESHEET.LIST",
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

    static async getProcessoTimeSheetByProcessoIdAndColaboradorId(idProcesso, idColaborador) {
        try {
            let response = await getAllOrByProcessoIdAndColaboradorId(idProcesso, idColaborador)
            return {
                data: response,
                message: "TIMESHEET.PROCESSO.COLABORADOR.LIST",
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

    static async updateProcessoTimeSheet({
        tipoEventoId,
        colaboradorId,
        clienteId,
        processoId,
        modoFacturacao,
        taxaProcesso,
        taxaColaborador,
        descricao,
        dadosImportantes,
        dataInicio,
        dataFim,
        horas,
        idProcessoTimeSheet
    }) {
        try {

            const dataDTO = {
                "tipo_evento_id": tipoEventoId,
                "colaborador_id": colaboradorId,
                "cliente_id": clienteId,
                "processo_id": processoId,
                "modo_facturacao": modoFacturacao,
                "taxa_processo": taxaProcesso,
                "taxa_colaborador": taxaColaborador,
                "descricao": descricao,
                "dados_importantes": dadosImportantes,
                "data_inicio": dataInicio,
                "data_fim": dataFim,
                "horas": horas,
            }

            let response = await updateProcessoTimeSheet(dataDTO, idProcessoTimeSheet)

            return {
                data: response,
                message: "TIMESHHET.PROCESSO.UPDATED",
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

    static async deleteProcessoTimeSheet(idProcessoTimeSheet) {
        try {

            let response = await removeProcessoTimeSheet(idProcessoTimeSheet)

            return {
                data: response,
                message: "TIMESHHET.PROCESSO.DELETED",
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

    static async getProcessoTimeSheetNaoFacturado(idProcesso, idUser) {
        try {

            let response = await getTimeSheetNaoFacturado(idProcesso, idUser)

            return {
                data: response,
                message: "TIMESHHET.PROCESSO.NOT.FACTURADO.LIST",
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
    static async getTotalTarefas(year, idUser) {
        try {

            let response = await getTotalTarefas(year, idUser)

            return {
                data: response,
                message: "TIMESHHET.PROCESSO.NOT.FACTURADO.LIST",
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

    static async getTotalProjectos(year, idUser) {
        try {

            let response = await getTotalProjectos(year, idUser)

            return {
                data: response,
                message: "TIMESHHET.PROCESSO.NOT.FACTURADO.LIST",
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

    static async getAllTimeSheets() {
        try {

            let response = await getAllTimeSheets()
            return {
                data: response,
                message: "TIMESHHET.PROCESSO.NOT.FACTURADO.LIST",
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
    static async getAllTimeSheetsByProcessoId(idProcesso) {
        try {

            let response = await get()
            return {
                data: response,
                message: "TIMESHHET.PROCESSO.NOT.FACTURADO.LIST",
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
    static async getById(idProcessoTimeSheet) {
        try {

            let response = await getById(idProcessoTimeSheet)
            return {
                data: response,
                message: "TIMESHHET.PROCESSO.NOT.FACTURADO.LIST",
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

    static async getAllTIpoTarefas() {
        try {

            let response = await getAllTiposTarefas()
            return {
                data: response,
                message: "TIMESHHET.TASK.TYPE.LIST",
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

    static async changeStatus(idTimeSheet, status) {
        try {

            let response = await submeterTimeSheet(idTimeSheet, status)
            return {
                data: response,
                message: "TIMESHHET.CHANGE.TIMESHEET.STATUS.LIST",
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



}

module.exports = ProcessoTimeSheetService;