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
const validateCreateTarefa = require('../middlewares/validateCreateTarefa.js');

const processo = express.Router()

const ROUTES_PATH = {
    INDEX: '/processo',
    RECURSOS: '/recursos_processo',
    ANEXOS: '/anexos_processo',
    ANEXOS_DOWN: '/view_anexo_processo',
    TASK_PROCESSO: '/tarefas_processo',
    PROCESSO_COLABORADOR: '/processo_colaborador',
    PROCESSO_FACTURA: '/processo_factura',
    PROCESSO_INSTITUICOES: '/processo-instituicoes',
    PROCESSO_MODO_FACTURACAO: '/processo-modo-facturacao',
    PROCESSO_STATUS: '/processo-status'
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

// Tarefas
processo.put(`${ROUTES_PATH.TASK_PROCESSO}/:id`, new ProcessoController().updateTarefaProcesso)
processo.put(`${ROUTES_PATH.TASK_PROCESSO}/gestor/:id`, new ProcessoController().concluirTarefaProcesso)
processo.put(`${ROUTES_PATH.TASK_PROCESSO}/colaborador/:id`, new ProcessoController().realizarTarefaProcesso)
processo.post('/tarefas', validateCreateTarefa, new ProcessoController().createTarefa)
processo.get('/tarefas_colaborador/:id', validateCreateTarefa, new ProcessoController().getAllTarefaByColaboradorId)

processo.put('/processo-metodologias/:id', validateCreateTarefa, new ProcessoController().updateProcessoMetodologias)

// instituições
processo.get(`${ROUTES_PATH.PROCESSO_INSTITUICOES}`, 
    new ProcessoController().getAllInstituicoes
)
// modo facturacao
processo.get(`${ROUTES_PATH.PROCESSO_MODO_FACTURACAO}`, 
    new ProcessoController().getAllModoFacturacao
)
// status
processo.get(`${ROUTES_PATH.PROCESSO_STATUS}`, 
    new ProcessoController().getAllProcessoStatus
)

module.exports = processo