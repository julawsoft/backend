const responseHttp = require('../../utils/http/response');
const ProcessoServive = require('../../services/processos/ProcessoService');

async function getProcessoController(req, res) {

        const {clientId, instituicaoId, fase, estadoId, gestorId, colaboradorId, mFacturacaoId, dataInicio, dataFim} = req.query
        const response = await ProcessoServive.getProcesso(
                {
                        clientId, instituicaoId, fase, estadoId, gestorId, colaboradorId, mFacturacaoId,dataInicio, dataFim
                }
        )
        return responseHttp(res, response.status, response.message, response.data, [])
}

module.exports = getProcessoController