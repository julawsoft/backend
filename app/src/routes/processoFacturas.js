const express = require('express');

const validateCreateFacturaProcesso = require('../middlewares/validateFacturaProcesso.js');
const ProcessoFacturasController = require('../controllers/processo/ProcessoFacturasController.js');
const validateCreatePagamentoFactura = require('../middlewares/validatePagamentoFactura.js');

const processoFacturas = express.Router()

const ROUTES_PATH = {
    PROCESSO_FACTURA: '/processo-factura',
    PROCESSO_FACTURA_COLABORADOR: '/processo-factura-colaborador',
    PROCESSO_FACTURA_PAGAMENTO: '/pagamento-factura',
    PAGAMENTOS_FACTURA: '/pagamentos-facturas-by-id',
    MODO_PAGAMENTOS: '/modo-pagamentos',
    HONORARIOS: '/honorarios',
    HONORARIO_INVOICE: '/honorario_invoice',
}

processoFacturas.post(ROUTES_PATH.PROCESSO_FACTURA, validateCreateFacturaProcesso, new ProcessoFacturasController().createFacturaProcesso)
processoFacturas.post('processo_factura_honorario', validateCreateFacturaProcesso, new ProcessoFacturasController().createFacturaProcessoHonorario)
processoFacturas.post(ROUTES_PATH.PROCESSO_FACTURA_PAGAMENTO, validateCreatePagamentoFactura, new ProcessoFacturasController().createPagamentoFactura)
processoFacturas.get(ROUTES_PATH.PROCESSO_FACTURA_PAGAMENTO, new ProcessoFacturasController().getPagamentoFactura)
processoFacturas.get(`${ROUTES_PATH.PAGAMENTOS_FACTURA}/:id`, new ProcessoFacturasController().getPagamentoByIdFactura)
processoFacturas.get(`${ROUTES_PATH.MODO_PAGAMENTOS}`, new ProcessoFacturasController().getModoPagamentos)
processoFacturas.get(`${ROUTES_PATH.PROCESSO_FACTURA}`, new ProcessoFacturasController().getFacturas)
processoFacturas.get(`${ROUTES_PATH.PROCESSO_FACTURA}/:id`, new ProcessoFacturasController().getFacturaOne)
processoFacturas.get(`${ROUTES_PATH.PROCESSO_FACTURA_COLABORADOR}/:id`, new ProcessoFacturasController().getFacturasByColaborador)
processoFacturas.get(`${ROUTES_PATH.HONORARIOS}`, new ProcessoFacturasController().getHonorarios)
processoFacturas.post(`${ROUTES_PATH.HONORARIOS}`, new ProcessoFacturasController().saveHonorarios)
processoFacturas.get(`${ROUTES_PATH.HONORARIO_INVOICE}/:id`, new ProcessoFacturasController().getHonorarioInvoice)
processoFacturas.put(`${ROUTES_PATH.HONORARIO_INVOICE}/:id`, new ProcessoFacturasController().approveHonorarioInvoice)

module.exports = processoFacturas;