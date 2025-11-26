const express = require('express');

const validateProcessoTimeSheet = require('../middlewares/validateProcessoTimeSheet.js');
const TimeSheetsController = require('../controllers/TimeSheetsController.js');

const timesheetsRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/timesheets',
    TIMESHEETS_PROCESSO: '/timesheets-processo',
    TIMESHEETS_CLIENTE: '/timesheets-cliente',
    TIMESHEETS_COLABORADOR: '/timesheets-colaborador',
    TIMESHEETS_HONORARIOS: '/timesheets-honorarios',
    TIMESHEETS_TIPO_TAREFAS: '/timesheets-tipos-tarefas',
    TIMESHEET_NAO_FACTURADO: '/timesheets-nao-faturados',
    TIMESHEET_TOTAL_TAREFAS: '/timesheets-total-taferas',
    TIMESHEET_TOTAL_PROJECTOS: '/timesheets-total-projectos',
    TIMESHEET_CHANGE_STATUS: '/timesheets-change-status',
}

// timesheetsRouter.post(ROUTES_PATH.INDEX, validateProcessoTimeSheet, new TimeSheetsController().createProcessoTimeSheet)
// timesheetsRouter.get(`${ROUTES_PATH.INDEX}/:idProcesso/:idColaborador`, new TimeSheetsController().getProcessoTimeSheetByColaboradorId)
// timesheetsRouter.put(`${ROUTES_PATH.INDEX}/:idProcessoTimeSheet/`, new TimeSheetsController().updateProcessoTimeSheet)
// timesheetsRouter.delete(`${ROUTES_PATH.INDEX}/:idProcessoTimeSheet/`, new TimeSheetsController().deleteProcessoTimeSheet)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEET_NAO_FACTURADO}`, new TimeSheetsController().processoTimeSheetNaoFacturado)

timesheetsRouter.get(`${ROUTES_PATH.INDEX}`, new TimeSheetsController().getAll)
timesheetsRouter.get(`${ROUTES_PATH.INDEX}/:id`, new TimeSheetsController().getById)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEETS_PROCESSO}/:id`, new TimeSheetsController().getAllByProcessoId)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEETS_COLABORADOR}/:id`, new TimeSheetsController().getAllByColaboradorId)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEETS_CLIENTE}/:id`, new TimeSheetsController().getAllByClienteId)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEETS_TIPO_TAREFAS}`, new TimeSheetsController().getAllTIpoTarefas)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEET_TOTAL_TAREFAS}`, new TimeSheetsController().getTotalTarefas)
timesheetsRouter.get(`${ROUTES_PATH.TIMESHEET_TOTAL_PROJECTOS}`, new TimeSheetsController().getTotalProjectos)
timesheetsRouter.patch(`${ROUTES_PATH.TIMESHEET_CHANGE_STATUS}`, new TimeSheetsController().changeStatus)


module.exports = timesheetsRouter