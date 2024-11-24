const express = require('express');

const validateCreateFacturaProcesso = require('../middlewares/validateFacturaProcesso.js');
const ProcessoFacturasController = require('../controllers/processo/ProcessoFacturasController.js');

const processoFacturas = express.Router()

const ROUTES_PATH = {
    PROCESSO_FACTURA: '/processo_factura',
}

processoFacturas.post(ROUTES_PATH.PROCESSO_FACTURA, validateCreateFacturaProcesso, new ProcessoFacturasController().createFacturaProcesso)

module.exports = processoFacturas;