const { StatusCodes } = require("http-status-codes");
const {
  create,
  getAll,
  getById,
} = require("../../persistencia/models/Processos");
const {
  getAllByKeyValue: TarefaGetByKey,
  createTarefa,
} = require("../../persistencia/models/ProcessosTarefas");
const {
  getByProcessoId: PrecedenteGetByKey,
  createPrecedente,
} = require("../../persistencia/models/ProcessosPrecedentes");
const {
  getByProcessoId: EquipaGetByKey,
  createEquipa,
} = require("../../persistencia/models/ProcessosEquipa");

class ProcessoServive {
  /**
   * @param {string} denominacao
   * @param {number} tipoId
   * @param {string} nif
   * @param {string} endereco
   * @param {string} pessoaContacto
   * @param {string} contactoCobranca
   * @param {string} nota
   * @param {string} status
   *
   */
  static async createProcesso({
    assunto,
    area,
    fase,
    instituicaoId,
    modoFacturacaoId,
    clienteId,
    gestorId,
    contraParte,
    dataRegisto,
    dataSuspensao,
    colaboradorIdSuspendeu,
    dataEncerramento,
    colaboradorIdEnderrou,
    metodologia,
    estrategia,
    factos,
    objectivos,
    dataImportantes,
    statusId,
    precedentes,
    equipas,
    tarefas,
  }) {
    // Implementar logica para criacao do processo
    // Inserir dados no banco de dados
    try {
      const processoCreated = await create({
        assunto,
        area,
        fase,
        instituicaoId,
        modoFacturacaoId,
        clienteId,
        gestorId,
        contraParte,
        dataRegisto,
        dataSuspensao,
        colaboradorIdSuspendeu,
        dataEncerramento,
        colaboradorIdEnderrou,
        metodologia,
        estrategia,
        factos,
        objectivos,
        dataImportantes,
        statusId,
      });

      if (precedentes) {
        for (let precedente of precedentes) {
          let processoId = processoCreated.id;
          createPrecedente({
            processo_id: processoId,
            precedente_id: precedente,
          });
        }
      }

      if (equipas) {
        for (let equipa of equipas) {
          let processoId = processoCreated.id;
          createEquipa({
            processo_id: processoId,
            colaborador_id: equipa,
          });
        }
      }

      if (tarefas) {
        for (let tarefa of tarefas) {
          let processoId = processoCreated.id;
          createTarefa({
            processo_id: processoId,
            descricao: tarefa,
          });
        }
      }

      return {
        data: processoCreated,
        message: "PROCESS:CREATE",
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

  static async getProcesso() {
    try {
      const processos = await getAll();

      let processoDTO = [];

      for (let processo of processos) {
        if (processo.id) {
          let tarefas = await TarefaGetByKey("processo_id", processo.id);
          let precedentes = await PrecedenteGetByKey(processo.id);
          let equipas = await EquipaGetByKey("processo_id", processo.id);

          processoDTO.push({
            ...processo,
            tarefas: tarefas ?? [],
            precedentes: precedentes ?? [],
            equipas: equipas ?? [],
          });
        }
      }

      return {
        data: processoDTO,
        message: "PROCESS:LIST.OK",
        status: StatusCodes.OK,
      };
    } catch (e) {
      console.log(">>>>>>><<<<", e);

      return {
        data: __filename,
        message: e.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }

  static async getByIdProcesso(id) {
    try {
      const processos = await getById(id);

      let processoDTO = [];

      for (let processo of processos) {
        if (processo.id) {
          let tarefas = await TarefaGetByKey("processo_id", processo.id);
          let precedentes = await PrecedenteGetByKey(processo.id);
          let equipas = await EquipaGetByKey("processo_id", processo.id);

          processoDTO.push({
            ...processo,
            tarefas: tarefas ?? [],
            precedentes: precedentes ?? [],
            equipas: equipas ?? [],
          });
        }
      }

      return {
        data: processoDTO,
        message: "PROCESS:LIST.OK",
        status: StatusCodes.OK,
      };
    } catch (e) {
      console.log(">>>>>>><<<<", e);

      return {
        data: __filename,
        message: e.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR,
      };
    }
  }
}

module.exports = ProcessoServive;
