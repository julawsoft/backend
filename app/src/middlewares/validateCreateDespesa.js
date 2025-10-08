const { body } = require('express-validator')

const validateCreateDespesa = [
    body('processoId').isNumeric().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    // body('age').isInt({ min: 18, max: 65 }).withMessage('A idade deve ser um número inteiro entre 18 e 65.'),
    body('valor').isString().notEmpty().withMessage('O NIF é obrigatório'),
    body('dataMovimento').isString().notEmpty().withMessage('O Endereço é obrigatório'),
    body('colaboradorId').isNumeric().notEmpty().withMessage('O Pessoa de Contacto é obrigatório'),
    body('clienteId').isNumeric().notEmpty().withMessage('O Contacto de Cobrança é obrigatório'),
    body('tipoDespesaId').isNumeric().notEmpty().withMessage('O E-mail é obrigatório'),
]

module.exports = validateCreateDespesa