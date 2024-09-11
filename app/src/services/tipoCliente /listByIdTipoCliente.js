const { listById } = require("../../persistencia/models/TipoCliente.js")


/**
 * @param id number
 */
async function listByIdTipoCliente (id) {
    try {
        const listTipoClienteData = await listById(id)
        return listTipoClienteData;
    }catch(e){
        console.log(e, __filename)
        return e.getMessage()
    }
}

module.exports = listByIdTipoCliente