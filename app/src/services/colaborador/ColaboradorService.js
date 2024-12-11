const { StatusCodes } = require("http-status-codes");
const { listAll } = require("../../persistencia/models/TipoColaborador");

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

}

module.exports = ColaboradorService