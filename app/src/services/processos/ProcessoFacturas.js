const { StatusCodes } = require("http-status-codes");
const { getProcessoFacturasByClienteId, createProcessoFactura } = require("../../persistencia/models/ProcessoFacturas");
const { createProcessoFacturaItems, getFacturaItemsByFacturaId } = require("../../persistencia/models/ProcessoFacturasItems");
const { createPagamentoFactura, getPagamentoFactura, getPagamentoByIdFactura } = require("../../persistencia/models/PagamentoFactura");
const { getModoPagamentos } = require("../../persistencia/models/ModoPagamentojs");
const saveBase64Image = require("../../utils/saveBase64Image");

class ProcessoFacturasServive {
 

  static async getProcessoFacturasByCliente(idCliente) {
    try {

      let listProcessoFacturasByCliente = await getProcessoFacturasByClienteId(idCliente)

      let facturasDTO = []


      console.log("listProcessoFacturasByCliente" , listProcessoFacturasByCliente)

      if (listProcessoFacturasByCliente) {
        for await (let facturaCliente of listProcessoFacturasByCliente) {

              console.log("here .... ", facturaCliente)
               let items =  await getFacturaItemsByFacturaId(facturaCliente.processo_factura_id)
               let pagamentos =  await getPagamentoByIdFactura(facturaCliente.id)

               facturasDTO.push({...facturaCliente, items, pagamentos})
        
        }
      }

  

      return {
        data: facturasDTO,
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

          let itemSavedReturn = []

          if(resp.id && items.length) {

            for await (let item of items) {
              
            let itemSaved = await createProcessoFacturaItems({
                "processoFacturaId": resp.id,
                "processoTimeSheetId": item.processos_timesheet_id,
                "horas": item.horas,
                "custo": item.custo,
                "dadosAdicionais": item.custo,
                "dadosAdicionais": item.dados_adicionais,
              })

              itemSavedReturn.push(itemSaved)
            }
            
            return {
              data: {...resp.dataValues, items: itemSavedReturn },
              message: 'PROCESSO:FACTURA:CREATED',
              status: StatusCodes.CREATED,
            }
          }

          return {
            data: {...resp.dataValues, items: [] },
            message: 'PROCESSO:FACTURA:CREATED',
            status: StatusCodes.CREATED,
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


  static async createPagamentoFactura({
    facturaId,
    colaboradorId,
    valorFactura,
    valorPago,
    valorRestante,
    anexo,
    modoPagamentoId,
    desconto,
    obs 
   }) {

    try {


      let fileName = `anexo_payment_${new Date().getTime()}_${facturaId}`

      let { data } = await saveBase64Image(fileName, anexo);
      let path = `${data.path}@${data.fileName}`

      let response = await createPagamentoFactura({ 
        facturaId,
        colaboradorId,
        valorFactura,
        valorPago,
        valorRestante,
        anexo: path,
        modoPagamentoId,
        desconto,
        obs })
     
          return {
            data: response,
            message: 'PAGAMENTO:FACTURA:CREATED',
            status: StatusCodes.CREATED,
          }
              
      }catch(e) {      
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
  }

  static async getPagamentoFactura() {

    try {

      let response = await getPagamentoFactura()
     
          return {
            data: response,
            message: 'PAGAMENTO:FACTURA:LIST',
            status: StatusCodes.OK,
          }
              
      }catch(e) {      
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
  }

  static async getPagamentoByIdFactura(idFactura) {

    try {

      let response = await getPagamentoByIdFactura(idFactura)
     
          return {
            data: response,
            message: 'PAGAMENTO:FACTURA:BYID:LIST',
            status: StatusCodes.OK,
          }
              
      }catch(e) {      
        return {
          data: __filename,
          message: e.message,
          status: StatusCodes.INTERNAL_SERVER_ERROR,
        };
      }
  }

  static async getModoPagamentos() {
    try {

      let response = await getModoPagamentos()
     
          return {
            data: response,
            message: 'MODO:PAGAMENTO:LIST',
            status: StatusCodes.OK,
          }
              
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
