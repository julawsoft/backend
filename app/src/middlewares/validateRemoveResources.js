const { body } = require('express-validator')

const validateRemoveResources = [
    body('type').notEmpty().withMessage('Campo obrigatório.'),
    body('valueId').notEmpty().withMessage('Campo obrigatório.'),
]

module.exports = validateRemoveResources
