const { ROLES } = require("../../const.js");
const { create } = require("../../persistencia/models/Colaborador.js");
const { makeInitialColaborador } = require("../../utils/string.js");
const createKeycloakColaborador = require("../keycloak/createColaborador.js");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById.js");

/**
* @param {string} username
* @param {string} nomeCompleto
* @param {string} nomeProfissional
* @param {string} dataNascimento
* @param {string} funcao
* @param {string} tipoColaboradorId
*
* @returns {Array} Colaborador
*/
async function createColaborador({ username, nomeCompleto, nomeProfissional, dataNascimento, funcao, tipoColaboradorId }) {
           
        const defaultPassword = "julaw"
        const role = switchRole(funcao)
        const [firstName, lastName] = nomeCompleto.split(" ")

        /**const keyCloakColaborador = await createKeycloakColaborador({
            username,
            password: defaultPassword,
            firstName,
            lastName, 
            groups: role
        })**/
        
        const dataToSave = {
            "nomeCompleto": nomeCompleto,
            "nomeProfissional": nomeProfissional,
            "dataNascimento": dataNascimento,
            "funcao": funcao,
            "tipoColaboradorId": tipoColaboradorId,
            "uuid": Math.random().toString().slice(2) + new Date().getTime().toString(),
            /**keyCloakColaborador.uuid.toString()***/
            "inicial":  makeInitialColaborador(nomeCompleto)
        }     

        const dataColaborador = await create({...dataToSave})
        const tipoColadorador = await listTipoColaboradorById(dataColaborador.dataValues.tipo_colaborador_id) 
        return await {...dataColaborador.dataValues, tipo: tipoColadorador }

 }

 function switchRole (role) {
    switch (role) {
        case ROLES.ROOT:
            return ROLES.ROOT;
        case ROLES.ADV_ESTAGIARIO:
            return ROLES.ADV_ESTAGIARIO;
        case ROLES.ADV_JUNIOR:
            return ROLES.ADV_JUNIOR;
        case ROLES.ADV_SENIOR:
            return ROLES.ADV_SENIOR;
        default:
            return ROLES.ADMIN;
    }
 }

module.exports = createColaborador