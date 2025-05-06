const express = require('express');

const validateProcessoTimeSheet = require('../middlewares/validateProcessoTimeSheet.js');
const ProcessoTimeSheetController = require('../controllers/processo/ProcessoTimeSheetController.js');

const processoTimeSheet = express.Router()

const ROUTES_PATH = {
    INDEX: '/processo_time_sheets',
    INDEX_ALL: '/processo_time_sheets_all',
    TIMESHEET_NAO_FACTURADO: '/processo_time_sheets_nao_faturado',
}

processoTimeSheet.post(ROUTES_PATH.INDEX, validateProcessoTimeSheet, new ProcessoTimeSheetController().createProcessoTimeSheet)
processoTimeSheet.get(ROUTES_PATH.INDEX_ALL, new ProcessoTimeSheetController().getProcessoAllTimeSheet)
processoTimeSheet.get(`${ROUTES_PATH.INDEX}/:idProcesso`, new ProcessoTimeSheetController().getProcessoTimeSheetByProcessoId)
processoTimeSheet.get(`${ROUTES_PATH.INDEX}/:idProcesso/:idColaborador`, new ProcessoTimeSheetController().getProcessoTimeSheetByColaboradorId)
processoTimeSheet.put(`${ROUTES_PATH.INDEX}/:idProcessoTimeSheet/`, new ProcessoTimeSheetController().updateProcessoTimeSheet)
processoTimeSheet.delete(`${ROUTES_PATH.INDEX}/:idProcessoTimeSheet/`, new ProcessoTimeSheetController().deleteProcessoTimeSheet)
processoTimeSheet.get(`${ROUTES_PATH.TIMESHEET_NAO_FACTURADO}`, new ProcessoTimeSheetController().processoTimeSheetNaoFacturado)

module.exports = processoTimeSheet