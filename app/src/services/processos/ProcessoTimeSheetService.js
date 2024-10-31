const { StatusCodes } = require("http-status-codes");
const { create, getAllOrByProcessoId } = require("../../persistencia/models/ProcessosTimeSheet");


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

            console.log(">>>>>>>>>>>", idProcesso)
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
}

module.exports = ProcessoTimeSheetService;