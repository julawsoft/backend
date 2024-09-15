const { create } = require("../../persistencia/models/Colaborador.js");
const createKeycloakColaborador = require("../keycloak/createColaborador.js")

/**
* @param {string} nomeCompleto
* @param {string} nomeProfissional
* @param {string} dataNascimento
*
* @returns {Array} Colaborador
*/
async function createColaborador({ nomeCompleto, nomeProfissional, dataNascimento }) {
           
    try {

        const keyCloakColaborador = await createKeycloakColaborador()
        
        console.log(keyCloakColaborador.uuid)
        const dataToSave = {
            "nomeCompleto": nomeCompleto,
            "nomeProfissional": nomeProfissional,
            "dataNascimento": dataNascimento,
            "uuid": keyCloakColaborador.uuid,
        }
        
        return await create({...dataToSave})
    }catch(e){
        if(e.name === "SequelizeUniqueConstraintError")
            throw new Error(JSON.stringify(e.original.sqlMessage))
        return e
    }
 }

module.exports = createColaborador