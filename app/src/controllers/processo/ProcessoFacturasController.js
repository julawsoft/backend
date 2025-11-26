const responseHttp = require('../../utils/http/response');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const ProcessoFacturasServive = require('../../services/processos/ProcessoFacturas');

class ProcessoFacturasController {

        async saveHonorarios(req, res) {

                const dataBody = req.body
                let response = await ProcessoFacturasServive.createFacturaProcesso({
                        "processoId": dataBody.processoId,
                        "clienteId": dataBody.clienteId,
                        "colaboradorId": dataBody.colaboradorId,
                        "custo": dataBody.custo,
                        "status": dataBody.status,
                        "items": dataBody.items ?? []                   
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }   
        
        async createFacturaProcesso(req, res) {

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body

                let response = await ProcessoFacturasServive.createFacturaProcesso({
                        "processoId": dataBody.processo_id,
                        "clienteId": dataBody.cliente_id,
                        "colaboradorId": dataBody.colaborador_id,
                        "horas": dataBody.horas,
                        "custo": dataBody.custo,
                        "status": "pendente",
                        "items": dataBody.items ?? []                   
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }   
        
        async createFacturaProcessoHonorario(req, res) {

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body

                let response = await ProcessoFacturasServive.createFacturaProcesso({
                        "processoId": dataBody.processo_id,
                        "clienteId": dataBody.cliente_id,
                        "colaboradorId": dataBody.colaborador_id,
                        "horas": dataBody.horas,
                        "custo": dataBody.custo,
                        "status": "pendente",
                        "items": dataBody.items ?? []                   
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }   

        async createPagamentoFactura(req, res) {

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }

                const dataBody = req.body

                let response = await ProcessoFacturasServive.createPagamentoFactura({
                        "facturaId": dataBody.factura_id,
                        "colaboradorId": dataBody.colaborador_id,
                        "valorFactura": dataBody.valor_factura,
                        "valorPago": dataBody.valor_pago,
                        "valorRestante": dataBody.valor_restante,
                        "anexo": dataBody.anexo,
                        "modoPagamentoId": dataBody.modo_pagamento_id,               
                        "desconto": dataBody.desconto,            
                        "obs": dataBody.obs            
                })

                return responseHttp(res, response.status, response.message, response.data, [])
        }    
        
        async getPagamentoFactura(req, res) {

                let response = await ProcessoFacturasServive.getPagamentoFactura()
                return responseHttp(res, response.status, response.message, response.data, [])
        }  

        async getPagamentoByIdFactura(req, res) {

                let { id } = req.params;

                let response = await ProcessoFacturasServive.getPagamentoByIdFactura(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }  

        async getFacturas(req, res) {
                let { idProcesso } = req.query;
                let response = await ProcessoFacturasServive.getFacturas(idProcesso)
                return responseHttp(res, response.status, response.message, response.data, [])
        } 
        
        async getFacturaOne(req, res) {
                let { id } = req.params;
                let response = await ProcessoFacturasServive.getFacturaOne(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }  
  
        async getFacturasByColaborador(req, res) {
                let { id } = req.params;
                let response = await ProcessoFacturasServive.getFacturasByColaborador(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }  

        async getModoPagamentos(req, res) {
                let response = await ProcessoFacturasServive.getModoPagamentos()
                return responseHttp(res, response.status, response.message, response.data, [])
        } 

        async getHonorarios(req, res) {
                const {idProcess, idCliente, idColaborador} = req.query
                let response = await ProcessoFacturasServive.getHonorarios({idProcess, idCliente, idColaborador})
                return responseHttp(res, response.status, response.message, response.data, [])
        }  
        async getHonorarioInvoice(req, res) {
                const {id} = req.params
                let response = await ProcessoFacturasServive.getHonorariosInvoice(id)
                return responseHttp(res, response.status, response.message, response.data, [])
        }  
        async approveHonorarioInvoice(req, res) {
                const {id} = req.params
                const {userId} = req.body
                let response = await ProcessoFacturasServive.approveHonorariosInvoice(id, userId)
                return responseHttp(res, response.status, response.message, response.data, [])
        }  
        
        
}

module.exports = ProcessoFacturasController;
