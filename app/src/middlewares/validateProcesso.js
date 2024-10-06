const { body } = require('express-validator')

const validateCreateProcesso = [
    body('assunto').isString().notEmpty().withMessage('O assunto é obrigatório e deve ser uma string.'),
    body('area').isString().notEmpty().withMessage('O area é obrigatório e deve ser uma string.'),
    body('instituicaoId').notEmpty().withMessage('Campo obrigatório'),
    body('modoFacturacaoId').notEmpty().withMessage('Campo obrigatório'),
    body('dataRegisto').notEmpty().withMessage('Campo obrigatório'),
    body('statusId').isNumeric().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
]

module.exports = validateCreateProcesso