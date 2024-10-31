const { Cliente, updateById } = require("../../persistencia/models/Cliente.js")
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
* @param {number} id
*
* @returns {Array} Cliente
*/
async function updateCliente (
    {
        denominacao,
        tipo_id,
        nif,
        endereco,
        pessoa_contacto,
        contacto_cobranca,
        nota,
        status,
        id
    }
) {    
        const newCliente = await updateById({
            "denominacao": denominacao,
            "tipoId": tipo_id, 
            "nif": nif,
            "endereco": endereco,
            "pessoaContacto": pessoa_contacto,
            "contactoCobranca": contacto_cobranca,
            "nota": nota,
            "status": status,
            id,
        })
        //let tipoCliente = await  listByIdTipoCliente(newCliente.tipo_id)
        return {...newCliente };
}

module.exports = updateCliente;