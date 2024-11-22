const { StatusCodes } = require("http-status-codes");
const { create, Cliente } = require("../../persistencia/models/Cliente.js")
const listByIdTipoCliente = require("../tipoCliente /listByIdTipoCliente.js")

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
            console.log("errrrr  try ")
            const newCliente = await create({
                "denominacao": denominacao,
                "tipoId": tipoId, 
                "nif": nif,
                "endereco": endereco,
                "pessoaContacto": pessoaContacto,
                "contactoCobranca": contactoCobranca,
                "e_mail": e_mail,
                "nota": nota,
                "status": status
            })
            
            console.log("1")
            let tipoCliente = await  listByIdTipoCliente(newCliente.tipo_id)
            console.log("2")
      
            return {
              data: {...newCliente.dataValues, tipo: tipoCliente},
              message: "CLIENT:CREATE",
              status: StatusCodes.CREATED,
            };
          } catch (e) {
            console.log("here ", e)
            return {
              data: __filename,
              message: e.message,
              status: StatusCodes.INTERNAL_SERVER_ERROR,
            };
          }

}

module.exports = createCliente