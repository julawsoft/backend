const { StatusCodes } = require("http-status-codes");
const { create, Cliente } = require("../../persistencia/models/Cliente.js")
const listByIdTipoCliente = require("../tipoCliente /listByIdTipoCliente.js");
const createKeycloakColaborador = require("../keycloak/createColaborador.js");

/**
* @param {string} denominacao
* @param {number} tipoId
* @param {string} nif
* @param {string} endereco
* @param {string} pessoaContacto
* @param {string} contactoCobranca
* @param {string} nota
* @param {string} status
*
* @returns {Array} Cliente
*/
async function createCliente (
    {
        denominacao, 
        tipoId, 
        nif,
        endereco,
        pessoaContacto,
        contactoCobranca,
        e_mail,
        nota,
        status
    }
) {    

        try {

          const defaultPassword = "julaw"
          const role = "client_julaw"
      
          const keyCloakUser = await createKeycloakColaborador({
              "username": e_mail,
              "password": defaultPassword,
              "email": e_mail,
              "firstName": denominacao,
              "lastName": pessoaContacto,
              "groups": role
          })

          console.log("keyCloakUser keyCloakUser ", keyCloakUser)

            const newCliente = await create({
                "denominacao": denominacao,
                "tipoId": tipoId, 
                "nif": nif,
                "endereco": endereco,
                "pessoaContacto": pessoaContacto,
                "contactoCobranca": contactoCobranca,
                "e_mail": e_mail,
                "nota": nota,
                "status": status,
                "uuid": keyCloakUser.uuid.toString()
            })
            
            let tipoCliente = await  listByIdTipoCliente(newCliente.tipo_id)
      
            return {
              data: {...newCliente.dataValues, tipo: tipoCliente},
              message: "CLIENT:CREATE",
              status: StatusCodes.CREATED,
            };
          } catch (e) {
            return {
              data: __filename,
              message: e.message ? e.message : e,
              status: StatusCodes.INTERNAL_SERVER_ERROR,
            };
          }

}

module.exports = createCliente