const express = require('express');

const createClienteController = require('../controllers/cliente/createClienteController.js')
const getByIdClienteController = require('../controllers/cliente/getByIdClienteController.js')
const getAllClienteController = require('../controllers/cliente/getAllClienteController.js')
const updateClienteController = require('../controllers/cliente/updateClienteController.js')

const validateCreateCliente = require('../middlewares/validateCreateCliente.js');
const ClienteController = require('../controllers/cliente/ClienteController.js');

const clienteRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/cliente',
    CLIENTE_PROCESSOS: '/cliente_processos',
    CLIENTE_PROCESSOS_FACTURAS: '/cliente_facturas'
}

clienteRouter.get(ROUTES_PATH.INDEX, getAllClienteController)
clienteRouter.get(`${ROUTES_PATH.INDEX}/:id`, getByIdClienteController)
clienteRouter.get(`${ROUTES_PATH.CLIENTE_PROCESSOS}/:id`, new ClienteController().getProcessos)
clienteRouter.get(`${ROUTES_PATH.CLIENTE_PROCESSOS_FACTURAS}/:id`, new ClienteController().getProcessoFacturasByCliente)
clienteRouter.post(ROUTES_PATH.INDEX, validateCreateCliente, createClienteController)
clienteRouter.put(ROUTES_PATH.INDEX, validateCreateCliente, updateClienteController)
clienteRouter.get('/cliente_type/:id', new ClienteController().filterByType)

module.exports = clienteRouter