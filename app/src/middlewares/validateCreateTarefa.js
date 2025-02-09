const { body } = require('express-validator')

const validateCreateTarefa = [
    body('processoId').notEmpty().withMessage('O ID do Processo é obrigatório.'),
    body('colaboradorId').notEmpty().withMessage('Campo obrigatório.'),
    body('descricao').notEmpty().withMessage('Campo obrigatório.'),
    body('dataParaRealizacao').notEmpty().withMessage('Campo obrigatório.'),
]

module.exports = validateCreateTarefa