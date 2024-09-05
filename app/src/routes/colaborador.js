const express = require('express');

const createColaboradorController = require('../controllers/colaborador/createColaboradorController.js')
const validateCreateColaborador = require('../middlewares/validateCreateColaborador.js')

const colaboradorRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/colaborador'
}

colaboradorRouter.post(ROUTES_PATH.INDEX, validateCreateColaborador, createColaboradorController)

module.exports = colaboradorRouter