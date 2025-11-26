const { body } = require('express-validator')

const validateCreateTask = [
    body('processoId').notEmpty().withMessage('Campo obrigatório'),
    body('descricao').notEmpty().withMessage('Campo obrigatório'),
    body('clienteId').notEmpty().withMessage('Campo obrigatório'),
    body('status').notEmpty().withMessage('Campo obrigatório'),
    body('dataParaRealizacao').notEmpty().withMessage('Campo obrigatório'),
    body('colaboradorId').notEmpty().withMessage('Campo obrigatório'),
    body('gestorId').notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
    body('tipoTarefaId').isNumeric().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
]

module.exports = validateCreateTask