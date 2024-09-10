const express = require('express');

const createClienteController = require('../controllers/Cliente/createClienteController.js')
const getByIdClienteController = require('../controllers/Cliente/getByIdClienteController.js')
const getAllClienteController = require('../controllers/Cliente/getAllClienteController.js')
const updateClienteController = require('../controllers/Cliente/updateClienteController.js')

const validateCreateCliente = require('../middlewares/validateCreateCliente.js')

const ClienteRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/Cliente'
}

ClienteRouter.post(ROUTES_PATH.INDEX, validateCreateCliente, createClienteController)
ClienteRouter.get(`${ROUTES_PATH.INDEX}:id`, getByIdClienteController)
ClienteRouter.get(ROUTES_PATH.INDEX, getAllClienteController)
ClienteRouter.put(ROUTES_PATH.INDEX, validateCreateCliente, updateClienteController)

module.exports = ClienteRouter