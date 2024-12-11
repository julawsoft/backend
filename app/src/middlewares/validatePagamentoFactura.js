const { body } = require('express-validator')

const validateCreatePagamentoFactura = [

    body('factura_id').notEmpty().withMessage('O ID da Factura é obrigatório.'),
    body('colaborador_id').notEmpty().withMessage('O Colaborador é obrigatório.'),
    body('valor_factura').notEmpty().withMessage('O Valor da Factura é um campo obrigatório.'),
    body('valor_pago').notEmpty().withMessage('O Valor Pago é um campo obrigatório.'),
    body('valor_restante').notEmpty().withMessage('O Valor Restante é um campo obrigatório.'),
    body('anexo').notEmpty().withMessage('O anexo é um campo obrigatório.'),
    body('modo_pagamento_id').notEmpty().withMessage('O modo de pagamento é um campo obrigatório.'),
    
]

module.exports = validateCreatePagamentoFactura