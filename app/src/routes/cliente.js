const express = require('express');

const createClienteController = require('../controllers/cliente/createClienteController.js')
const getByIdClienteController = require('../controllers/cliente/getByIdClienteController.js')
const getAllClienteController = require('../controllers/cliente/getAllClienteController.js')
const updateClienteController = require('../controllers/cliente/updateClienteController.js')

const validateCreateCliente = require('../middlewares/validateCreateCliente.js')

const clienteRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/cliente'
}

clienteRouter.get(ROUTES_PATH.INDEX, getAllClienteController)
// clienteRouter.get(`${ROUTES_PATH.INDEX}/:id`, getByIdClienteController)
clienteRouter.post(ROUTES_PATH.INDEX, validateCreateCliente, createClienteController)
// clienteRouter.put(ROUTES_PATH.INDEX, validateCreateCliente, updateClienteController)

module.exports = clienteRouter