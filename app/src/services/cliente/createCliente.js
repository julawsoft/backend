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
        nota,
        status
    }
) {    
        const newCliente = await create({
            "denominacao": denominacao,
            "tipoId": tipoId, 
            "nif": nif,
            "endereco": endereco,
            "pessoaContacto": pessoaContacto,
            "contactoCobranca": contactoCobranca,
            "nota": nota,
            "status": status
        })
        let tipoCliente = await  listByIdTipoCliente(newCliente.tipo_id)
        return {...newCliente.dataValues, tipo: tipoCliente}   
}

module.exports = createCliente