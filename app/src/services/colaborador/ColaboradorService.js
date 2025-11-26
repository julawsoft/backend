const { StatusCodes } = require("http-status-codes");
const { listAll } = require("../../persistencia/models/TipoColaborador");
const { getAll: listColaboradorCategorias } = require("../../persistencia/models/ColaboradorCategorias");
const { getTimesheetFacturaByColaboradorId, getTimesheetByColaboradorId } = require("../../persistencia/models/Colaborador");

class ColaboradorService {

    static async getTipoColaboradores() {
        try {
     
            let response = await listAll();
      
            return {
              data: response,
              message: "TIPO:COLABORADOR.LIST.OK",
              status: StatusCodes.OK,
            };
          } catch (e) {
            return {
              data: __filename,
              message: e.message,
              status: StatusCodes.INTERNAL_SERVER_ERROR,
            };
          }
    }

    static async getTimesheetFacturaByColaboradorId(idColaborador) {
      try {
     
        let response = await getTimesheetFacturaByColaboradorId(idColaborador);
  
        return {
          data: response,
          message: "TIPO:COLABORADOR.TIMISHEET.FACTURA.OK",
          status: StatusCodes.OK,
        };
      } catch (e) {
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
    }

    static async getTimesheetColaboradorId(idColaborador) {
      try {
     
        let response = await getTimesheetByColaboradorId(idColaborador);
  
        return {
          data: response,
          message: "TIPO:COLABORADOR.TIMISHEET.FACTURA.OK",
          status: StatusCodes.OK,
        };
      } catch (e) {
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
    }

    static async getCategoriasColaboradores() {
      try {
     
        let response = await listColaboradorCategorias();
  
        return {
          data: response,
          message: "CATEGORIAS:COLABORADOR.LIST.OK",
          status: StatusCodes.OK,
        };
      } catch (e) {
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
    }

}

module.exports = ColaboradorService