const { StatusCodes } = require("http-status-codes");
const { getProcessoFacturasByClienteId, createProcessoFactura } = require("../../persistencia/models/ProcessoFacturas");
const { createProcessoFacturaItems } = require("../../persistencia/models/ProcessoFacturasItems");

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

  static async createFacturaProcesso({
    processoId,
    clienteId,
    colaboradorId,
    horas,
    custo,
    status,
    items   
   }) {

    try {

      
      return createProcessoFactura({ 
        processoId,
        clienteId,
        colaboradorId,
        horas,
        custo,
        status
      }).then(async (resp) => {

          if(resp.id && items.length) {

            for await (let item of items) {
              
            await createProcessoFacturaItems({
                "processoFacturaId": resp.id,
                "processoTimeSheetId": item.processos_timesheet_id,
                "horas": item.horas,
                "custo": item.custo,
                "dadosAdicionais": item.custo,
                "dadosAdicionais": item.dados_adicionais,
              })
            }
            
            return {
              data: resp,
              message: 'PROCESSO:FACTURA:CREATED',
              status: StatusCodes.CREATED,
            }
          }

          return {
            data: resp,
            message: 'Items facturas does not empty',
            status: StatusCodes.BAD_REQUEST,
          }
          
        }).catch((e) => {
          return {
            data: __filename,
            message: e.message,
            status: StatusCodes.BAD_GATEWAY,
          };
        })
        
      }catch(e) {      
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
  }

 
}

module.exports = ProcessoFacturasServive;
