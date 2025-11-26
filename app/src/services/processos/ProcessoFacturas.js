const { StatusCodes } = require("http-status-codes");
const { approveHonorariosInvoice, getHonorariosInvoice, getProcessoFacturasByClienteId, createProcessoFactura, getAllFacturas, getFacturasByColaborador, getHonorarios, getProcessoFacturasById } = require("../../persistencia/models/ProcessoFacturas");
const { createProcessoFacturaItems, getFacturaItemsByFacturaId } = require("../../persistencia/models/ProcessoFacturasItems");
const { createPagamentoFactura, getPagamentoFactura, getPagamentoByIdFactura } = require("../../persistencia/models/PagamentoFactura");
const { getModoPagamentos } = require("../../persistencia/models/ModoPagamentojs");
const saveBase64Image = require("../../utils/saveBase64Image");

const {changeStatus: changeStatusTimeSheet} = require("./ProcessoTimeSheetService");
const {changeStatus: changeStatusDespesas} = require("../despesas/DespesasService");


class ProcessoFacturasServive {
 

  static async getProcessoFacturasByCliente(idCliente) {
    try {

      let listProcessoFacturasByCliente = await getProcessoFacturasByClienteId(idCliente)

      let facturasDTO = []

      if (listProcessoFacturasByCliente) {
        for await (let facturaCliente of listProcessoFacturasByCliente) {
          
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
    custo,
    status,
    items   
   }) {

    try {

      return createProcessoFactura({ 
        processoId,
        clienteId,
        colaboradorId,
        custo,
        status
      }).then(async (resp) => {

          let itemSavedReturn = []

          if(resp.id && items.length) {

            for await (let item of items) {

            console.log(">>>>>>>> ", item)
              
            let itemSaved = await createProcessoFacturaItems({
                "processoFacturaId": resp.id,
                "horas": item.horas,
                "custo": item.valor,
                "tipo": item.tipo,
                "tipo_id": item.id,
              })

              console.log("itemSaved ", item.tipo)

              if(item.tipo === "timesheet") {
                changeStatusTimeSheet(item.id, 'faturado')
              }else{
                changeStatusDespesas(item.id, 'faturado')
              }
              
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

  static async getFacturas(idProcesso) {

    try {

      let response = await getAllFacturas(idProcesso)
     
          return {
            data: response,
            message: 'FACTURA:LIST',
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
  static async getFacturasByColaborador(id) {

    try {

      let response = await getFacturasByColaborador(id)
     
          return {
            data: response,
            message: 'FACTURA:COLABORADOR:LIST',
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

  /**
   * @param {*} idProcess 
   * @param {*} idCliente 
   * @param {*} idColaborador 
   * @returns 
   */
  static async getHonorarios({idProcess, idCliente, idColaborador}) {

    try {

      let response = await getHonorarios({idProcess, idCliente, idColaborador})
     
          return {
            data: response,
            message: 'FACTURA:COLABORADOR:LIST',
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
  /**
   * @param {*} id
   * @returns 
   */
  static async getHonorariosInvoice(id) {

    try {

      let resultGetHonorarios = await getHonorariosInvoice(id)

      let items =  await getFacturaItemsByFacturaId(resultGetHonorarios[0].processo_factura_id)
      let pagamentos =  await getPagamentoByIdFactura(resultGetHonorarios[0].processo_factura_id)

          return {
            data: {...resultGetHonorarios[0], items: items, peyments: pagamentos},
            message: 'FACTURA:COLABORADOR:LIST',
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

    /**
   * @param {*} id
   * @returns 
   */
    static async approveHonorariosInvoice(id, userId) {

      try {
  
        let resultApproveHonorarios = await approveHonorariosInvoice(id, userId)

        console.log("o retorno apos aprovacao", resultApproveHonorarios)

        let response =  await getHonorariosInvoice(id)

        console.log("O response ", response)
        
            return {
              data: {...response},
              message: 'FACTURA:COLABORADOR:LIST',
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

  static async getFacturaOne(idProcessoFactura) {
    try{
      let response = await getProcessoFacturasById(idProcessoFactura)
      let items =  await getFacturaItemsByFacturaId(response[0].processo_facturacao_id)
     
      return {
        data: {...response[0], items},
        message: 'FACTURA:COLABORADOR:LIST',
        status: StatusCodes.OK,
      }

    }catch(e){
      return {
        data: __filename,
        message: e.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  } 
 
}

module.exports = ProcessoFacturasServive;
