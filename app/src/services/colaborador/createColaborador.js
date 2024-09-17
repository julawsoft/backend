const { create } = require("../../persistencia/models/Colaborador.js");
const { makeInitialColaborador } = require("../../utils/string.js");
const createKeycloakColaborador = require("../keycloak/createColaborador.js");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById.js");

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

        const dataColaborador = await create({...dataToSave})
        const tipoColadorador = await listTipoColaboradorById(dataColaborador.dataValues.tipo_colaborador_id) 
        return await {...dataColaborador.dataValues, tipo: tipoColadorador }

 }

module.exports = createColaborador