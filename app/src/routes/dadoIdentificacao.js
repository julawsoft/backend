const express = require('express');

const validateCreateDadosIdentificacao = require('../middlewares/validateCreateDadosIdentificacao.js');
const createDadosIdentificacaoController = require('../controllers/dadosIdentificacao/createDadosIdentificacaoController.js');
const getDadosIdentificacaoByColaboradorController = require('../controllers/dadosIdentificacao/getDadosIdentificacaoByColaboradorController.js');

const dadosIdentificacaoRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/dados_identificacao',
    BY_COLABORADOR: '/dados_identificaco_colaborador'
}

// dadoContactoRouter.get(ROUTES_PATH.INDEX, getAllClienteController)
dadosIdentificacaoRouter.get(`${ROUTES_PATH.BY_COLABORADOR}/:id`, getDadosIdentificacaoByColaboradorController)
dadosIdentificacaoRouter.post(ROUTES_PATH.INDEX, validateCreateDadosIdentificacao, createDadosIdentificacaoController)
// clienteRouter.put(ROUTES_PATH.INDEX, validateCreateCliente, updateClienteController)

module.exports = dadosIdentificacaoRouter