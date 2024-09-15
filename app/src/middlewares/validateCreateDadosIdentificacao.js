const { body } = require('express-validator')

const validateCreateDadosIdentificacao = [
    body('tipo_documento_id').notEmpty().isInt().withMessage('O tipo é obrigatório e deve ser um numero.'),
    body('valor').isString().notEmpty().withMessage('O valor é obrigatório'),
    body('colaborador_id').notEmpty().isInt().withMessage('O id do Colaborador  é obrigatório'),
]

module.exports = validateCreateDadosIdentificacao
