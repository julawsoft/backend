const express = require('express');

const validateCreateDespesa = require('../middlewares/validateCreateDespesa.js');
const DespesaController = require('../controllers/processo/DespesasController.js');

const despesasRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/despesas',
    TYPES: '/tipos-despesas',
}
despesasRouter.post(`${ROUTES_PATH.INDEX}`, validateCreateDespesa, new DespesaController().createDespesa)
despesasRouter.put(`${ROUTES_PATH.INDEX}/:id`, validateCreateDespesa, new DespesaController().updateDespesa)
despesasRouter.get(`${ROUTES_PATH.INDEX}`, new DespesaController().getAll)
despesasRouter.get(`${ROUTES_PATH.INDEX}/:id`, new DespesaController().get)
despesasRouter.get(`${ROUTES_PATH.TYPES}`, new DespesaController().getTiposDespesas)

module.exports = despesasRouter