const express = require('express');

const validateCreateDadosCustoFinanceiro = require('../middlewares/validateCreateDadosCustoFinanceiro.js');
const createDadosCustoFinanceiroController = require('../controllers/dadosCustoFinanceiro/createDadosCustoFinanceiroController.js');
const getDadosCustoFinanceiroByColaboradorController = require('../controllers/dadosCustoFinanceiro/getDadosCustoFinanceiroByColaboradorController.js');

const dadosCustoFinanceiroRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/dados_custo_financeiro',
    BY_COLABORADOR: '/dados_custo_financeiro'
}

// dadoContactoRouter.get(ROUTES_PATH.INDEX, getAllClienteController)
dadosCustoFinanceiroRouter.get(`${ROUTES_PATH.BY_COLABORADOR}/:id`, getDadosCustoFinanceiroByColaboradorController)
dadosCustoFinanceiroRouter.post(ROUTES_PATH.INDEX, validateCreateDadosCustoFinanceiro, createDadosCustoFinanceiroController)
// clienteRouter.put(ROUTES_PATH.INDEX, validateCreateCliente, updateClienteController)

module.exports = dadosCustoFinanceiroRouter