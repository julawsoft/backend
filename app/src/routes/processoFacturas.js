const express = require('express');

const validateCreateFacturaProcesso = require('../middlewares/validateFacturaProcesso.js');
const ProcessoFacturasController = require('../controllers/processo/ProcessoFacturasController.js');
const validateCreatePagamentoFactura = require('../middlewares/validatePagamentoFactura.js');

const processoFacturas = express.Router()

const ROUTES_PATH = {
    PROCESSO_FACTURA: '/processo_factura',
    PROCESSO_FACTURA_COLABORADOR: '/processo_factura_colaborador',
    PROCESSO_FACTURA_PAGAMENTO: '/pagamento_factura',
    PAGAMENTOS_FACTURA: '/pagamentos_facturas_by_id',
    MODO_PAGAMENTOS: '/modo_pagamentos',
}

processoFacturas.post(ROUTES_PATH.PROCESSO_FACTURA, validateCreateFacturaProcesso, new ProcessoFacturasController().createFacturaProcesso)
processoFacturas.post(ROUTES_PATH.PROCESSO_FACTURA_PAGAMENTO, validateCreatePagamentoFactura, new ProcessoFacturasController().createPagamentoFactura)
processoFacturas.get(ROUTES_PATH.PROCESSO_FACTURA_PAGAMENTO, new ProcessoFacturasController().getPagamentoFactura)
processoFacturas.get(`${ROUTES_PATH.PAGAMENTOS_FACTURA}/:id`, new ProcessoFacturasController().getPagamentoByIdFactura)
processoFacturas.get(`${ROUTES_PATH.MODO_PAGAMENTOS}`, new ProcessoFacturasController().getModoPagamentos)
processoFacturas.get(`${ROUTES_PATH.PROCESSO_FACTURA}`, new ProcessoFacturasController().getFacturas)
processoFacturas.get(`${ROUTES_PATH.PROCESSO_FACTURA_COLABORADOR}/:id`, new ProcessoFacturasController().getFacturasByColaborador)

module.exports = processoFacturas;