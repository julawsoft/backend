const { body } = require('express-validator')

const validateAnexosProcesso = [
    body('processoId').notEmpty().withMessage('O ID do Processo é obrigatório.'),
]

module.exports = validateAnexosProcesso