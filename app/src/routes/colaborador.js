const express = require('express');

const createColaboradorController = require('../controllers/colaborador/createColaboradorController.js')
const getByIdColaboradorController = require('../controllers/colaborador/getByIdColaboradorController.js')
const getAllColaboradorController = require('../controllers/colaborador/getAllColaboradorController.js')
const updateColaboradorController = require('../controllers/colaborador/updateColaboradorController.js')

const validateCreateColaborador = require('../middlewares/validateCreateColaborador.js')

const colaboradorRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/colaborador'
}

colaboradorRouter.post(ROUTES_PATH.INDEX, validateCreateColaborador, createColaboradorController)
colaboradorRouter.get(`${ROUTES_PATH.INDEX}/:id`, getByIdColaboradorController)
colaboradorRouter.get(ROUTES_PATH.INDEX, getAllColaboradorController)
colaboradorRouter.put(ROUTES_PATH.INDEX, validateCreateColaborador, updateColaboradorController)

module.exports = colaboradorRouter