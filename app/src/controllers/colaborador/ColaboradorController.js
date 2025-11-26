const ColaboradorService = require("../../services/colaborador/ColaboradorService");
const responseHttp = require("../../utils/http/response");

class ColaboradorController {

    async getTimesheetFacturaByColaboradorId(req, res) {
      
      const {id} = req.params
      const response = await ColaboradorService.getTimesheetFacturaByColaboradorId(id)
      return responseHttp(res, response.status, response.message, response.data, [])
    
    }

    async getTimesheetByColaboradorId(req, res) {

      const {id} = req.params
      const response = await ColaboradorService.getTimesheetColaboradorId(id)
      return responseHttp(res, response.status, response.message, response.data, [])
    
    }

    async getCategoriasColaboradores(req, res) {
      const response = await ColaboradorService.getCategoriasColaboradores()
      return responseHttp(res, response.status, response.message, response.data, [])
    }
              
}


module.exports = ColaboradorController;