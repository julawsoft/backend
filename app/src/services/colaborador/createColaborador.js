const { StatusCodes } = require("http-status-codes");
const { ROLES } = require("../../const.js");
const { create } = require("../../persistencia/models/Colaborador.js");
const { makeInitialColaborador } = require("../../utils/string.js");
const createKeycloakColaborador = require("../keycloak/createColaborador.js");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById.js");
const removeKeycloakColaborador = require("../keycloak/removeColaborador.js");

/**
 * @param {string} username
 * @param {string} nomeCompleto
 * @param {string} nomeProfissional
 * @param {string} dataNascimento
 * @param {string} funcao
 * @param {string} tipoColaboradorId
 *
 * @returns {Array} Colaborador
 */
async function createColaborador({
  username,
  nomeCompleto,
  nomeProfissional,
  inicial,
  funcao,
  tipoColaboradorId,
  dataNascimento,
  tokenReset,
  status,
  taxaHoraria,
  contactoPessoal,
  contactoEmergencia,
  nIdentificacao,
  nCedulaOrdem,
  emailPessoal,
  emailCorporativo,
  categoriaId
  
}) {
    let keyCloakColaborador;
  try {

    /*

    const defaultPassword = "julaw";
    const role = funcao;
    const [firstName, lastName] = nomeCompleto.split(" ");

    keyCloakColaborador = await createKeycloakColaborador({
      username: username,
      password: defaultPassword,
      email: "",
      firstName: firstName,
      lastName: lastName ?? username,
      groups: role
    });
    
    */

    // console.log("keyCloakColaborador ", keyCloakColaborador)
    // console.log("keyCloakColaborador here ...  ", keyCloakColaborador.uuid)

    const dataToSave = {
      username,
      nomeCompleto,
      nomeProfissional,
      funcao,
      tipoColaboradorId,
      dataNascimento,
      tokenReset,
      status,
      taxaHoraria: taxaHoraria == "" ? undefined : taxaHoraria,
      contactoPessoal,
      contactoEmergencia,
      nIdentificacao,
      nCedulaOrdem,
      emailPessoal,
      emailCorporativo,
      "uuid": Math.random().toString().slice(2) + new Date().getTime().toString(),
      // uuid: keyCloakColaborador.uuid.toString(),
      inicial: inicial?? makeInitialColaborador(nomeCompleto),
      categoriaId
    };

    console.log("dataToSave ::", dataToSave.uuid)

    const dataColaborador = await create({ ...dataToSave });
   
    return {
      data: { ...dataColaborador.dataValues },
      message: "COLABORADOR:CREATE",
      status: StatusCodes.CREATED
    };
  } catch (e) {
    console.log("error creating colaborador", e);
    let message = e.toString().includes("User exists with same username") ? "Nome de usuário já existe, altere-o" : e.message ?? e;
    if (!e.toString().includes("User exists with same username"))
        removeKeycloakColaborador(keyCloakColaborador.uuid);
    
    return {
        data: {},
        message: message,
        status: StatusCodes.BAD_REQUEST
      };
  }
}

function switchRole(role) {
  switch (role) {
    case ROLES.ROOT:
      return ROLES.ROOT;
    case ROLES.ADV_ESTAGIARIO:
      return ROLES.ADV_ESTAGIARIO;
    case ROLES.ADV_JUNIOR:
      return ROLES.ADV_JUNIOR;
    case ROLES.ADV_SENIOR:
      return ROLES.ADV_SENIOR;
    default:
      return ROLES.ADMIN;
  }
}

module.exports = createColaborador;
