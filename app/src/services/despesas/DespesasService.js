const { StatusCodes } = require("http-status-codes");
const { create } = require("../../persistencia/models/Despesas.js");



class DespesasService {

  /**
   * 
   * @param {{ idProcesso: number, valor: number, tipoMovimento: number, dataMovimento: Date, colaboradorId: number }} param0 
   * @returns 
   */
  static async createDespesa({
    idProcesso,
    valor,
    tipoMovimento,
    dataMovimento,
    colaboradorId
  }) {
    try {

      await create({
        idProcesso, valor, tipoMovimento, dataMovimento, colaboradorId
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

}

module.exports = DespesasService;
