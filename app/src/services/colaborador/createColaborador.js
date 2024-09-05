const Colaborador = require("../../persistencia/models/Colaborador")

async function createColaborador (colaborador) {
    
    const newColaborador = await Colaborador.create({
        name: 'Anselmo',
        email: 'acambinza@gmail.com'
    })

    console.log('createColaborador Service', newColaborador.toJSON())
}

module.exports = createColaborador