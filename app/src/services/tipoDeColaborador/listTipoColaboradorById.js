const { listById } = require("../../persistencia/models/TipoColaborador");

/**
 * @param {number} id
 */
async function listTipoColaboradorById (id) {
        return await listById(id)
}

module.exports = listTipoColaboradorById