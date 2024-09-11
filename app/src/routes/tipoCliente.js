const express = require('express');
const getAllTipoClienteController = require('../controllers/tipoCliente/getAllTipoClienteController');
const getByIdTipoClienteController = require('../controllers/tipoCliente/getTipoClienteByIdController');

const tipoClienteRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/tipo_cliente'
}

tipoClienteRouter.get(ROUTES_PATH.INDEX, getAllTipoClienteController)
tipoClienteRouter.get(`${ROUTES_PATH.INDEX}/:id`, getByIdTipoClienteController)

module.exports = tipoClienteRouter