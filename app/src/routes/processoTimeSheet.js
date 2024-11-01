const express = require('express');

const validateProcessoTimeSheet = require('../middlewares/validateProcessoTimeSheet.js');
const ProcessoTimeSheetController = require('../controllers/processo/ProcessoTimeSheetController.js');

const processoTimeSheet = express.Router()

const ROUTES_PATH = {
    INDEX: '/processo_time_sheets',
}

processoTimeSheet.post(ROUTES_PATH.INDEX, validateProcessoTimeSheet, new ProcessoTimeSheetController().createProcessoTimeSheet)
processoTimeSheet.get(`${ROUTES_PATH.INDEX}/:idProcesso`, new ProcessoTimeSheetController().getProcessoTimeSheetByProcessoId)
processoTimeSheet.get(`${ROUTES_PATH.INDEX}/:idProcesso/:idColaborador`, new ProcessoTimeSheetController().getProcessoTimeSheetByColaboradorId)

module.exports = processoTimeSheet