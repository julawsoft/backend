const { body } = require('express-validator')

const validateCreateColaborador = [
    body('name').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    body('email').isEmail().withMessage('E-mail inválido.'),
    body('age').isInt({ min: 18, max: 65 }).withMessage('A idade deve ser um número inteiro entre 18 e 65.'),
]

module.exports = validateCreateColaborador