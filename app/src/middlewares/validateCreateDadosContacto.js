const { body } = require('express-validator')

const validateCreateDadosContacto = [
    body('tipo').isString().notEmpty().withMessage('O tipo é obrigatório e deve ser uma string.'),
    // body('age').isInt({ min: 18, max: 65 }).withMessage('A idade deve ser um número inteiro entre 18 e 65.'),
    body('valor').isString().notEmpty().withMessage('O valor é obrigatório'),
    body('colaborador_id').notEmpty().withMessage('O id do Colaborador  é obrigatório'),
]

module.exports = validateCreateDadosContacto
