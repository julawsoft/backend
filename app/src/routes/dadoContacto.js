const express = require('express');

const createClienteController = require('../controllers/cliente/createClienteController.js')
const getByIdClienteController = require('../controllers/cliente/getByIdClienteController.js')
const getAllClienteController = require('../controllers/cliente/getAllClienteController.js')

const validateCreateDadosContacto = require('../middlewares/validateCreateDadosContacto.js');
const getDadosContactoByColaboradorController = require('../controllers/dadosContacto/getDadosContactoByColaboradorController.js');
const createDadosContactoController = require('../controllers/dadosContacto/createDadosContactoController.js');

const dadoContactoRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/dados_contacto',
    BY_COLABORADOR: '/dados_contacto_colaborador'
}

dadoContactoRouter.get(ROUTES_PATH.INDEX, getAllClienteController)
dadoContactoRouter.get(`${ROUTES_PATH.BY_COLABORADOR}/:id`, getDadosContactoByColaboradorController)
dadoContactoRouter.post(ROUTES_PATH.INDEX, validateCreateDadosContacto, createDadosContactoController)
// clienteRouter.put(ROUTES_PATH.INDEX, validateCreateCliente, updateClienteController)

module.exports = dadoContactoRouter