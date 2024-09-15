const { listById } = require("../../persistencia/models/TipoDocIdentificacao");

/**
 * @param {number} id
 */
async function listByIdTipoIdentificacao (id) {
        return await listById(id)
}

module.exports = listByIdTipoIdentificacao