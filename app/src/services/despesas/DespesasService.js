const { StatusCodes } = require("http-status-codes");
const { create, getAll, findFilter, findAllFilter, getAllDespesas,changeStatus,findOne,update } = require("../../persistencia/models/Despesas.js");
const { getAllTiposDespesas } = require("../../persistencia/models/TiposDespesas.js");



class DespesasService {

  /**
   * 
   * @param {{ idProcesso: number, valor: number, tipoMovimento: number, dataMovimento: Date, colaboradorId: number }} param0 
   * @returns 
   */
  static async updateDespesa(
    id,
    {
    colaboradorId, 
    dataMovimento, 
    valor, 
    clienteId, 
    tipoDespesaId,
    processoId
  }) {
    try {

      await update(
        id,{
        colaboradorId, dataMovimento, valor, clienteId, tipoDespesaId,processoId
      });

      return {
        data: colaboradorId,
        message: "PROCESSO.DESPESA:UPDATED",
        status: StatusCodes.CREATED,
      };
    } catch (e) {
      return {
        data: __filename,
        message: e.message,
        status: StatusCodes.BAD_REQUEST,
      };
    }
  }
  /**
   * 
   * @param {{ idProcesso: number, valor: number, tipoMovimento: number, dataMovimento: Date, colaboradorId: number }} param0 
   * @returns 
   */
  static async createDespesa({
    colaboradorId, 
    dataMovimento, 
    valor, 
    clienteId, 
    tipoDespesaId,
    processoId
  }) {
    try {

      await create({
        colaboradorId, dataMovimento, valor, clienteId, tipoDespesaId,processoId
      });

      return {
        data: colaboradorId,
        message: "PROCESSO.DESPESA:CREATED",
        status: StatusCodes.CREATED,
      };
    } catch (e) {
      return {
        data: __filename,
        message: e.message,
        status: StatusCodes.BAD_REQUEST,
      };
    }
  }

  static async findAll({
    colaboradorId,
    processoId,
    clienteId,
    tipoDespesaId,
    statusId,
    dataInicio,
    dataFim,
  }) {

    const result = await getAllDespesas({
      colaboradorId,
      processoId,
      clienteId,
      tipoDespesaId,
      statusId,
      dataInicio,
      dataFim,
    });
    return {
      data: result,
      message: "PROCESSO.DESPESA:GET",
      status: StatusCodes.OK,
    };
  }

  static async findFilter({
    clienteId,
    processoId
  }) {
    const result = await findAllFilter({clienteId, processoId});
    return {
      data: result,
      message: "PROCESSO.DESPESA.FILTEER:GET",
      status: StatusCodes.OK,
    };
  }

  static async getTiposDespesas(){
    try {

      const resultTipoDespesas = await getAllTiposDespesas();

      return {
        data: resultTipoDespesas,
        message: "TIPODESPESAS:GET",
        status: StatusCodes.OK,
      };
      
    }catch(e){
      return {
        data: null,
        message: `${e.message()}`,
        status: StatusCodes.BAD_REQUEST,
      };

    }
   
  }

  static async changeStatus(idDespesa, status) {
    try {

        let response = await changeStatus(idDespesa, status)
        return {
            data: response,
            message: "DESPESAS.CHANGE.STATUS.OK",
            status: StatusCodes.OK,
        };

    } catch (e) {
        return {
            data: __filename,
            message: e.message,
            status: StatusCodes.BAD_REQUEST,
        };
    }
}

static async findOne(despesaId) {

  const result = await findOne(despesaId);
  return {
    data: result,
    message: "PROCESSO.DESPESA:GETONE",
    status: StatusCodes.OK,
  };
}

}

module.exports = DespesasService;
