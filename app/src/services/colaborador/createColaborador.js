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

    const defaultPassword = "julaw";
    const role = funcao;
    const [firstName, lastName] = nomeCompleto.split(" ");

    keyCloakColaborador = await createKeycloakColaborador({
      username: username,
      password: defaultPassword,
      email: emailCorporativo ??  "",
      firstName: firstName,
      lastName: lastName ?? username,
      groups: role.toString().toLowerCase() === "root" ? [ROLES.ROOT] : [switchRole(role)]
    });
    
    if(!keyCloakColaborador.uuid)
      throw new Error("Erro ao criar colaborador no Keycloak");

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
      //"uuid": Math.random().toString().slice(2) + new Date().getTime().toString(),
      uuid: keyCloakColaborador.uuid.toString(),
      inicial: inicial?? makeInitialColaborador(nomeCompleto),
      categoriaId
    };

    const dataColaborador = await create({ ...dataToSave });
   
    return {
      data: { ...dataColaborador.dataValues },
      message: "COLABORADOR:CREATE",
      status: StatusCodes.CREATED
    };
  } catch (e) {
    if(e.toString().includes("User exists with same username")) 
        throw new Error("Nome de usuário já existe, altere-o")
    if(e.toString().includes("User exists with same email")) 
      throw new Error("E-mail de usuário já existe, altere-o")

    if(e.toString().includes("Unable to find matching target resource method")) 
      throw new Error("Auth - Unable to find matching target resource method")
    
    if(e.toString().includes("HTTP 403 Forbidden")) 
      throw new Error("Auth - HTTP 403 Forbidden")
    
   throw(e.responseData)
  }
}

function switchRole(role) {
  switch (role) {
    case ROLES.ROOT:
      return ROLES.ROOT;
    case ROLES.ADVOGADO:
      return ROLES.ADVOGADO;
    case ROLES.ESTAGIARIO:
      return ROLES.ESTAGIARIO;
    case ROLES.CONSULTOR:
      return ROLES.CONSULTOR;
    case ROLES.CLIENTE:
      return ROLES.CLIENTE;
    default:
      return ROLES.ADMIN;
  }
}

module.exports = createColaborador;
