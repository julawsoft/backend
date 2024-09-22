const { body } = require('express-validator')

const validateCreateColaborador = [
    body('nome_completo').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    body('nome_profissional').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    body('data_nascimento').notEmpty().isString().withMessage('Data de Nascimento deve ser uma string.'),
    body('tipo_colaborador_id').notEmpty().isInt().withMessage('Tipo de Colaborador deve ser numero.'),
    body('funcao').notEmpty().isString().withMessage('Função deve ser uma string.'),
    body('username').notEmpty().isString().withMessage('Nome de Usuário é Obrigatório.'),
]

module.exports = validateCreateColaborador