const express = require('express');

const validateCreateProcesso = require('../middlewares/validateProcesso.js');
const createProcessoController = require('../controllers/processo/createProcessoController.js');
const getProcessoController = require('../controllers/processo/getProcessosController.js');
const getByIdProcessoController = require('../controllers/processo/getByIdProcessoController.js');

const processo = express.Router()

const ROUTES_PATH = {
    INDEX: '/processo'
}

processo.post(ROUTES_PATH.INDEX, validateCreateProcesso, createProcessoController)
processo.get(ROUTES_PATH.INDEX, getProcessoController)
processo.get(`${ROUTES_PATH.INDEX}/:id`, getByIdProcessoController)

module.exports = processo