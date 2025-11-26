const express = require('express');

const createColaboradorController = require('../controllers/colaborador/createColaboradorController.js')
const getByIdColaboradorController = require('../controllers/colaborador/getByIdColaboradorController.js')
const getAllColaboradorController = require('../controllers/colaborador/getAllColaboradorController.js')
const updateColaboradorController = require('../controllers/colaborador/updateColaboradorController.js')

const validateCreateColaborador = require('../middlewares/validateCreateColaborador.js');
const getListColaboradorController = require('../controllers/colaborador/getListColaboradorController.js');
const validateUpdateColaborador = require('../middlewares/validateUpdateColaborador.js');
const ColaboradorController = require('../controllers/colaborador/ColaboradorController.js');

const colaboradorRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/colaborador',
    TIPO_COLABORADOR: '/tipos-colaboradores',
    CATEGORIA_COLABORADOR: '/categorias-colaboradores',
    COLABORADOR_TIMESHEET_FACTURA: '/colaborador_timesheet_factura'
}

colaboradorRouter.post(ROUTES_PATH.INDEX, validateCreateColaborador, createColaboradorController)
colaboradorRouter.get(`${ROUTES_PATH.INDEX}/:id`, getByIdColaboradorController)
colaboradorRouter.get(ROUTES_PATH.INDEX, getAllColaboradorController)
colaboradorRouter.put(`${ROUTES_PATH.INDEX}/:id`, validateUpdateColaborador, updateColaboradorController)
colaboradorRouter.get(ROUTES_PATH.TIPO_COLABORADOR, getListColaboradorController)
colaboradorRouter.get(ROUTES_PATH.CATEGORIA_COLABORADOR, new ColaboradorController().getCategoriasColaboradores)

// colaboradorRouter.get(ROUTES_PATH.COLABORADOR_TIMESHEET_FACTURA, getListColaboradorController)
colaboradorRouter.get(`${ROUTES_PATH.COLABORADOR_TIMESHEET_FACTURA}/:id`, new ColaboradorController().getTimesheetFacturaByColaboradorId)
colaboradorRouter.get(`/colaborador_timesheet/:id`, new ColaboradorController().getTimesheetByColaboradorId)

module.exports = colaboradorRouter