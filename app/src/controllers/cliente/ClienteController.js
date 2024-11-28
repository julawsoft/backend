const responseHttp = require('../../utils/http/response');
const ProcessoEquipasService = require('../../services/processos/ProcessoEquipasService');
const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { errosConst } = require('../../utils/http/erros.Const');
const ProcessoServive = require('../../services/processos/ProcessoService');
const getAllByKeyValueCliente = require('../../services/cliente/getAllByKeyValueCliente');
const ProcessoFacturasServive = require('../../services/processos/ProcessoFacturas');

class ClienteController {

      async getProcessos(req, res) {
        
        const {id} = req.params
        const clienteDataEmail = await getAllByKeyValueCliente("id", id)
        if (!clienteDataEmail.length) return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE_NIF, {}, ["ID Cliente not exists"])

        let response = await ProcessoServive.getProcessoByCliente(id);

        return responseHttp(res, response.status, response.message, response.data, [])
      
      }

      async getProcessoFacturasByCliente(req, res) {

        const {id} = req.params

        const clienteDataEmail = await getAllByKeyValueCliente("id", id)
        if (!clienteDataEmail.length) return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE_NIF, {}, ["ID Cliente not exists"])

          
        const response = await ProcessoFacturasServive.getProcessoFacturasByCliente(id)
        
        return responseHttp(res, response.status, response.message, response.data, [])
}

                
}

module.exports = ClienteController;
