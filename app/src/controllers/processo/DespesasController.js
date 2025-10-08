const responseHttp = require('../../utils/http/response');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const DespesasService = require('../../services/despesas/DespesasService.js');

class DespesasController {

        async createDespesa(req, res) {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body
                const {
                        colaboradorId, dataMovimento, valor, clienteId, tipoDespesaId, processoId
                } = dataBody;
                const response = await DespesasService.createDespesa(
                        {
                             colaboradorId, dataMovimento, valor, clienteId, tipoDespesaId,processoId
                        }
                );

                return responseHttp(res, response.status, response.message, response.data, []);
        }

        async getAll(req, res) {
                const response = await DespesasService.findAll();
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getFilter(req, res) {
                const {clienteId, processoId} = req.params

                const response = await DespesasService.findFilter({
                        clienteId,
                        processoId
                });
                return responseHttp(res, response.status, response.message, response.data, [])
        }

        async getTiposDespesas(req, res) {
                try{
                        const response = await DespesasService.getTiposDespesas();
                        return responseHttp(res, response.status, response.message, response.data, [])
                }catch(e){
                        return responseHttp(res, StatusCodes.INTERNAL_SERVER_ERROR, e.message(), response.data, [])
                }
             
        }

}

module.exports = DespesasController;
