const { body } = require('express-validator')

const validateCreateColaborador = [
    body('nomeCompleto').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    body('tipoColaboradorId').notEmpty().isInt().withMessage('O Tipo de Colaborador é obrigatório.'),
    body('categoriaId').notEmpty().isInt().withMessage('O Tipo de Categoria é obrigatório.'),
    body('contactoPessoal').notEmpty().isInt().withMessage('O Contacto Pessoal é obrigatório.'),
    body('nIdentificacao').notEmpty().isString().withMessage('N.º de Identificação é obrigatório.'),
    body('emailPessoal').notEmpty().isEmail().withMessage('E-mail Pessoal é obrigatorio.'),
    body('funcao').notEmpty().isString().withMessage('Função deve ser uma string.'),
    body('userName').notEmpty().isString().withMessage('Nome de Usuário é Obrigatório.'),
]

module.exports = validateCreateColaborador