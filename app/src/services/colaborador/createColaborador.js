const { create } = require("../../persistencia/models/Colaborador.js");
const { makeInitialColaborador } = require("../../utils/string.js");
const createKeycloakColaborador = require("../keycloak/createColaborador.js")

/**
* @param {string} nomeCompleto
* @param {string} nomeProfissional
* @param {string} dataNascimento
* @param {string} funcao
* @param {string} tipoColaboradorId
*
* @returns {Array} Colaborador
*/
async function createColaborador({ nomeCompleto, nomeProfissional, dataNascimento, funcao, tipoColaboradorId }) {
           
    try {

        const keyCloakColaborador = await createKeycloakColaborador()
        
        const dataToSave = {
            "nomeCompleto": nomeCompleto,
            "nomeProfissional": nomeProfissional,
            "dataNascimento": dataNascimento,
            "funcao": funcao,
            "tipoColaboradorId": tipoColaboradorId,
            "uuid": keyCloakColaborador.uuid,
            "inicial":  makeInitialColaborador(nomeCompleto)
        }     
            
        return await create({...dataToSave})
    }catch(e){
        if(e.name === "SequelizeUniqueConstraintError")
            throw new Error(JSON.stringify(e.original.sqlMessage))
        return e
    }
 }




module.exports = createColaborador