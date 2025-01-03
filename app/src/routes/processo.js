const express = require('express');

const validateCreateProcesso = require('../middlewares/validateProcesso.js');
const createProcessoController = require('../controllers/processo/createProcessoController.js');
const getProcessoController = require('../controllers/processo/getProcessosController.js');
const getByIdProcessoController = require('../controllers/processo/getByIdProcessoController.js');
const validateEquipasProcesso = require('../middlewares/validateEquipasProcesso.js');
const ProcessoController = require('../controllers/processo/ProcessoController.js');
const validateAnexosProcesso = require('../middlewares/validateAnexosProcesso.js');
const validateRemoveResources = require('../middlewares/validateRemoveResources.js');
const DespesaController = require('../controllers/processo/DespesasController.js');
const validateCreateFacturaProcesso = require('../middlewares/validateFacturaProcesso.js');

const processo = express.Router()

const ROUTES_PATH = {
    INDEX: '/processo',
    RECURSOS: '/recursos_processo',
    ANEXOS: '/anexos_processo',
    ANEXOS_DOWN: '/view_anexo_processo',
    TASK_PROCESSO: '/tarefas_processo',
    PROCESSO_COLABORADOR: '/processo_colaborador',
    PROCESSO_FACTURA: '/processo_factura',
}

processo.post(ROUTES_PATH.INDEX, validateCreateProcesso, createProcessoController)
processo.post(ROUTES_PATH.RECURSOS, validateEquipasProcesso, new ProcessoController().addRecursosProcesso)
processo.post(ROUTES_PATH.ANEXOS, validateAnexosProcesso, new ProcessoController().addAnexoProcesso)
processo.get(ROUTES_PATH.INDEX, getProcessoController)
processo.get(`${ROUTES_PATH.INDEX}/:id`, getByIdProcessoController)
processo.put(`${ROUTES_PATH.INDEX}/:id`, new ProcessoController().updateProcesso)
processo.get(`${ROUTES_PATH.ANEXOS_DOWN}/:id`, new ProcessoController().viewAnexoProcesso)
processo.get(`${ROUTES_PATH.PROCESSO_COLABORADOR}/:id`, new ProcessoController().getProcessoByColaborador)
processo.get(`${ROUTES_PATH.TASK_PROCESSO}/colaborador/:id`, new ProcessoController().getTarefaByColaboradorId)
processo.get(`${ROUTES_PATH.INDEX}/processos/list`, new ProcessoController().getListaProcessos)

processo.delete(`${ROUTES_PATH.RECURSOS}`, validateRemoveResources, new ProcessoController().removeRecursosProcesso)
processo.put(`${ROUTES_PATH.TASK_PROCESSO}/:id`, new ProcessoController().updateTarefaProcesso)
processo.post(`${ROUTES_PATH.INDEX}/despesa`, new DespesaController().createDespesa)
processo.get(`${ROUTES_PATH.INDEX}/despesa/all`, new DespesaController().getAll)
processo.get(`${ROUTES_PATH.PROCESSO_FACTURA}/:id`, new ProcessoController().getFacturas)

module.exports = processo