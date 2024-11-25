const responseHttp = require('../../utils/http/response');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const ProcessoFacturasServive = require('../../services/processos/ProcessoFacturas');

class ProcessoFacturasController {

        async createFacturaProcesso(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body

                console.log("facturasController ", dataBody)

                let response = await ProcessoFacturasServive.createFacturaProcesso({
                        "processoId": dataBody.processo_id,
                        "clienteId": dataBody.cliente_id,
                        "colaboradorId": dataBody.colaborador_id,
                        "horas": dataBody.horas,
                        "custo": dataBody.custo,
                        "status": "pendente",
                        "items": dataBody.items                   
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }
        
        
}

module.exports = ProcessoFacturasController;
