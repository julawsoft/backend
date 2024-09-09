const { create } = require("../../persistencia/models/Colaborador")


async function createColaborador () {

    try {
          /*const newColaborador = await Colaborador.create({
        name: 'Anselmo',
        email: 'acambinza@gmail.com'
    })
    */

    //console.log('createColaborador Service', newColaborador.toJSON())
    console.log("colaborador service ... ", await create({name: "ansel"}))

    }catch(e){
        console.log('createColaborador Service: ', e.message)
    }
       
  
}

module.exports = createColaborador