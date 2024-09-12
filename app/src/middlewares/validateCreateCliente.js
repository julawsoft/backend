const { body } = require('express-validator')

const validateCreateCliente = [
    body('denominacao').isString().notEmpty().withMessage('O nome é obrigatório e deve ser uma string.'),
    // body('age').isInt({ min: 18, max: 65 }).withMessage('A idade deve ser um número inteiro entre 18 e 65.'),
    body('nif').isString().notEmpty().withMessage('O NIF é obrigatório'),
    body('endereco').isString().notEmpty().withMessage('O Endereço é obrigatório'),
    body('pessoa_contacto').isString().notEmpty().withMessage('O Pessoa de Contacto é obrigatório'),
    body('contacto_cobranca').isString().notEmpty().withMessage('O Contacto de Cobrança é obrigatório'),
]

module.exports = validateCreateCliente