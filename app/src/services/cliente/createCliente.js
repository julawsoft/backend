const { create } = require("../../persistencia/models/Cliente")


async function createCliente () {

    try {
          /*const newCliente = await Cliente.create({
        name: 'Anselmo',
        email: 'acambinza@gmail.com'
    })
    */

    //console.log('createCliente Service', newCliente.toJSON())
    console.log("Cliente service ... ", await create({name: "ansel"}))

    }catch(e){
        console.log('createCliente Service: ', e.message)
    }
       
  
}

module.exports = createCliente