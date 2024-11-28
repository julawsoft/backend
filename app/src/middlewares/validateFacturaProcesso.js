const { body } = require('express-validator')

const validateCreateFacturaProcesso = [
    body('processo_id').notEmpty().withMessage('O ID do Processo é obrigatório.'),
    body('cliente_id').notEmpty().withMessage('O cliente é obrigatório.'),
    body('colaborador_id').notEmpty().withMessage('O Colaborador é obrigatório.'),
    body('custo').notEmpty().withMessage('O Custo é um campo obrigatório.'),
    body('items').notEmpty().isArray().withMessage('Os Item da factura são obrigatórios.'),
]

module.exports = validateCreateFacturaProcesso