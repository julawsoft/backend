const { StatusCodes } = require("http-status-codes");
const getAllByKeyValueColaborador = require("../../services/colaborador/getAllByKeyValueColaborador.js");
const updateColaborador = require("../../services/colaborador/updateColaborador.js");
const { validationResult } = require("express-validator");
const createDadosContacto = require("../../services/dadoContacto/createDadosContacto.js");
const createDadosIdentificacao = require("../../services/dadoIdentificacao/createDadosIdentificacao.js");
const removeDadosContacto = require("../../services/dadoContacto/removeDadosContacto.js");
const { deleteDadosIdentificacaoByColaborador } = require("../../persistencia/models/DadosIdentificacao.js");
const removeDadosIdentificacaoByColaborador = require("../../services/dadoIdentificacao/removeDadosIdentificacao.js");
const removeDadosContactoByColaborador = require("../../services/dadoContacto/removeDadosContacto.js");
const responseHttp = require("../../utils/http/response.js");

async function updateColaboradorController(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { id } = req.params;
    const dataBody = req.body;

    const responseColabData = await getAllByKeyValueColaborador("id", id);

    if (responseColabData.length === 0)
      return res.status(404).json({ errors: "Colaborador não existe" });

    const dataReturned = await updateColaborador({
      nomeCompleto: dataBody.nome_completo,
      nomeProfissional: dataBody.nome_profissional,
      dataNascimento: dataBody.data_nascimento,
      funcao: dataBody.funcao,
      tipoColaboradorId: dataBody.tipo_colaborador_id,
      taxa_horaria: dataBody.taxa_horaria,
      status: dataBody.status,
      id: id
    });

    if (dataReturned.status === StatusCodes.OK) {
        if (dataBody.contactos && dataBody.contactos.length) {
              await removeDadosContactoByColaborador(id)

          for await (let contactos of dataBody.contactos) {
            await createDadosContacto({
              tipo: contactos.tipo,
              valor: contactos.valor,
              descricao: contactos.descricao,
              colaboradorId: id
            });
          }
        }

        if (dataBody.identificacoes && dataBody.identificacoes.length) {

                await removeDadosIdentificacaoByColaborador(id)
                
          for await (let identificacoes of dataBody.identificacoes) {
            await createDadosIdentificacao({
              tipoDocumentoId: identificacoes.tipo,
              valor: identificacoes.valor,
              dataEmissao: identificacoes.data_emissao,
              dataValidade: identificacoes.data_validade,
              colaboradorId: id
            });
          }
        }

    } 

    return responseHttp(res, StatusCodes.OK, 'COLABORADOR.UPDATED', dataReturned, [])

  } catch (e) {
        return responseHttp(
                res,
                StatusCodes.BAD_GATEWAY,
                e.message,
                dataReturned,
                []
              );
  }
}

module.exports = updateColaboradorController;
