const responseHttp = require('../../utils/http/response');
const ProcessoServive = require('../../services/processos/ProcessoService');

async function getProcessoController(req, res) {
        const response = await ProcessoServive.getProcesso()
        return responseHttp(res, response.status, response.message, response.data, [])
}

module.exports = getProcessoController