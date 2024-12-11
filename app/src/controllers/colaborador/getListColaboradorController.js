const responseHttp = require('../../utils/http/response.js')
const ColaboradorService = require('../../services/colaborador/ColaboradorService.js');

async function getListColaboradorController(req, res) {

        const response = await ColaboradorService.getTipoColaboradores()
        return responseHttp(res, response.status, response.message, response.data, [])
}

module.exports = getListColaboradorController