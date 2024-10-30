const { body } = require('express-validator')

const validateProcessoTimeSheet = [
    body('tipoEventoId').notEmpty().withMessage('Campo obrigatório'),
    body('processoId').notEmpty().withMessage('Campo obrigatório'),
    body('descricao').notEmpty().withMessage('Campo obrigatório'),
    body('dadosImportantes').notEmpty().withMessage('Campo obrigatório'),
    body('dataInicio').isDate().notEmpty().withMessage('Campo obrigatório'),
    body('dataFim').isDate().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
    body('horas').isNumeric().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
]

module.exports = validateProcessoTimeSheet