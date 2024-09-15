const { body } = require('express-validator')

const validateCreateColaborador = [
    body('nome_completo').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    body('nome_profissional').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    body('data_nascimento').isString().withMessage('Data de Nascimento deve ser uma string.'),
]

module.exports = validateCreateColaborador