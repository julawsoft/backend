const { StatusCodes } = require("http-status-codes");
const { getProcessoFacturasByClienteId } = require("../../persistencia/models/ProcessoFacturas");

class ProcessoFacturasServive {
 

  static async getProcessoFacturasByCliente(idCliente) {
    try {

      let listProcessoFacturasByCliente = await getProcessoFacturasByClienteId(idCliente)

      return {
        data: listProcessoFacturasByCliente,
        message: "PROCESS:FACTURAS:LIST.OK",
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

module.exports = ProcessoFacturasServive;
