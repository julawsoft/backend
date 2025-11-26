const { body } = require('express-validator')

const validateProcessoTimeSheet = [
    //body('tipoEventoId').notEmpty().withMessage('Campo obrigatório'),
    //body('processoId').notEmpty().withMessage('Campo obrigatório'),
    //body('clienteId').notEmpty().withMessage('Campo obrigatório'),
    body('descricao').notEmpty().withMessage('Campo obrigatório'),
    // body('dadosImportantes').notEmpty().withMessage('Campo obrigatório'),
    body('dataInicio').isString().notEmpty().withMessage('Campo obrigatório'),
    body('dataFim').isString().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
    body('horas').isString().notEmpty().withMessage('Status do Processo é um Campo obrigatório'),
    body('tarefaId').notEmpty().withMessage('Campo obrigatório'),
]

module.exports = validateProcessoTimeSheet