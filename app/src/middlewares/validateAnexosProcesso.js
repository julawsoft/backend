const { body } = require('express-validator')

const validateAnexosProcesso = [
    body('processoId').notEmpty().withMessage('O ID do Processo é obrigatório.'),
    body('colaboradorId').notEmpty().withMessage('Campo obrigatório.'),
    body('anexos').notEmpty().withMessage('Campo obrigatório.'),
]

module.exports = validateAnexosProcesso