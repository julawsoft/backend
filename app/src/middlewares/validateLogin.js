const { body } = require('express-validator')

const validateLogin = [
    body('username').isString().notEmpty().withMessage('Usuário é obrigatório'),
    body('password').isString().notEmpty().withMessage('Password é obrigatório'),
]

module.exports = validateLogin