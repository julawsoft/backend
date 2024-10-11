const { body } = require('express-validator')

const validateEquipasProcesso = [
    body('processoId').notEmpty().withMessage('O ID do Processo é obrigatório.'),
]

module.exports = validateEquipasProcesso