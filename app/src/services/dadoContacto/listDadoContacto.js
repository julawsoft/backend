const { listAll } = require("../../persistencia/models/TipoCliente.js")

async function listTipoCliente () {
    try {
        const listTipoClienteData = await listAll()
        return listTipoClienteData;
    }catch(e){
        return e.getMessage()
    }
}

module.exports = listTipoCliente