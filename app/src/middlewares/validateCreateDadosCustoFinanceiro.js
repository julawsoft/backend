const { body } = require('express-validator')

const validateCreateDadosCustoFinanceiro = [
    body('taxa_horaria').notEmpty().isInt().withMessage('A Taxa Horaria deve ser numero.'),
]

module.exports = validateCreateDadosCustoFinanceiro
