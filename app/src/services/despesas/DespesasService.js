const { StatusCodes } = require("http-status-codes");
const { create, getAll, findFilter, findAllFilter } = require("../../persistencia/models/Despesas.js");



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

  static async findAll() {
    const result = await getAll();
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

}

module.exports = DespesasService;
