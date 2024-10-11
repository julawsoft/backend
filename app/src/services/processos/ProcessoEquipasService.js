const { StatusCodes } = require("http-status-codes");
const { createEquipa } = require("../../persistencia/models/ProcessosEquipa");

class ProcessoEquipasService {

  /**
   * @param {numer} processoId
   * @param {number[]} colaboradoresId
   */
  static async insertEquipaProcesso({
    processoId,
    colaboradoresId,
  }) {
    try {
      if (colaboradoresId) {
        for (let colaboradorId of colaboradoresId) {
          createEquipa({
            processo_id: processoId,
            colaborador_id: colaboradorId,
          });
        }
      }
     
      return {
        data: colaboradoresId,
        message: "PROCESS.EQUIPA:CREATED",
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

module.exports = ProcessoEquipasService;
