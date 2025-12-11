const { body } = require('express-validator')

const validateCreateProcesso = [
    body('assunto').isString().notEmpty().withMessage('O assunto é obrigatório e deve ser uma string.'),
    body('area').isString().notEmpty().withMessage('O area é obrigatório e deve ser uma string.'),
    body('instituicaoId').notEmpty().withMessage('Instituição é obrigatória'),
    body('modoFacturacaoId').notEmpty().withMessage('Modo de facturação é obrigatório'),
    body('dataRegisto').notEmpty().withMessage('Data de Registo é obrigatória'),
    body('statusId').isNumeric().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
]

module.exports = validateCreateProcesso