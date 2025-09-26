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
      username: dataBody.userName,
      nomeCompleto: dataBody.nomeCompleto,
      nomeProfissional: dataBody.nomeProfissional,
      inicial: dataBody.inicial,
      funcao: dataBody.funcao,
      tipoColaboradorId: dataBody.tipoColaboradorId,
      dataNascimento: dataBody.dataNascimento,
      tokenReset: dataBody.tokenReset,
      status: dataBody.status,
      taxaHoraria: dataBody.taxaHoraria || null,
      contactoPessoal: dataBody.contactoPessoal,
      contactoEmergencia: dataBody.contactoEmergencia || null,
      nIdentificacao: dataBody.nIdentificacao,
      nCedulaOrdem: dataBody.nCedulaOrdem || null,
      emailPessoal: dataBody.emailPessoal || null,
      emailCorporativo: dataBody.emailCorporativo || null,
      categoriaId: dataBody.categoriaId,
      id: id
    });


  return responseHttp(res, StatusCodes.OK, 'COLABORADOR.UPDATED', dataReturned.data, [])

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
