const ColaboradorService = require("../../services/colaborador/ColaboradorService");
const responseHttp = require("../../utils/http/response");

class ColaboradorController {

    async getTimesheetFacturaByColaboradorId(req, res) {
      
      const {id} = req.params

      
      const response = await ColaboradorService.getTimesheetFacturaByColaboradorId(id)
      console.log("here... ", response)

      return responseHttp(res, response.status, response.message, response.data, [])
    
    }
              
}


module.exports = ColaboradorController;