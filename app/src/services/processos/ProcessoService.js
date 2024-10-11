const { v4: uuidv4 } = require('uuid');
const { StatusCodes } = require("http-status-codes");
const {
  create,
  getAll,
  getById,
  update,
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
const saveBase64Image = require("../../utils/saveBase64Image");
const { createAnexo, getByProcessosId } = require('../../persistencia/models/ProcessosAnexos');


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
      const processo = await getById(id);

      let processoDTO = [];

        if (processo[0].id) {
          let tarefas = await TarefaGetByKey("processo_id", processo[0].id);
          let precedentes = await PrecedenteGetByKey(processo[0].id);
          let equipas = await EquipaGetByKey(processo[0].id);

          processoDTO.push({
            ...processo[0],
            tarefas: tarefas ?? [],
            precedentes: precedentes ?? [],
            equipas: equipas ?? [],
          });
        }

      return {
        data: processoDTO,
        message: "PROCESS:LIST.OK",
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


  static async addRecursosProcesso({
    processoId,
    precedentes,
    equipas,
    tarefas,
  }) {
    try {

      if (precedentes) {
        for (let precedente of precedentes) {
          createPrecedente({
            processo_id: processoId,
            precedente_id: precedente,
          });
        }
      }

      if (equipas) {
        for (let equipa of equipas) {
          createEquipa({
            processo_id: processoId,
            colaborador_id: equipa,
          });
        }
      }

      if (tarefas) {
        for (let tarefa of tarefas) {
          createTarefa({
            processo_id: processoId,
            descricao: tarefa,
          });
        }
      }

      const response = await this.getByIdProcesso(processoId);

      return {
        data: response.data,
        message: "RESOURCES.PROCESS:ADDED",
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


  static async addAnexoProcesso({
    processoId,
    colaboradorId,
    anexos,
  }) {
    try {

      const uuid = uuidv4();
      const fileName = `${uuid}_processo_${processoId}`

      if(anexos) {
        for (let anexo of anexos) {
          let {data} = await saveBase64Image(fileName, anexo.anexo);
          let path = `${data.path}@${data.fileName}`
          await createAnexo({
              "processoId": processoId,
              "colaboradorId": colaboradorId,
              "descricao": anexo.descricao,
              "path": path
          })
        }
      }

      let response = await getByProcessosId(processoId)
     
      return {
        data: response,
        message: "RESOUCES.PROCESS:ADDED",
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


  static async updateProcesso({
    processoId,
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
    statusId
  }) {
    try {
      const processoUpdated = await update({
        processoId,
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

      const response = await this.getByIdProcesso(processoId);

      return {
        data: response,
        message: "PROCESS:UPDATED",
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


}

module.exports = ProcessoServive;
