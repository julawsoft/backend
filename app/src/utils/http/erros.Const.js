
const errosConst = {
    CLIENT_CREATED: "Cliente created successfully",
    CLIENT_ERROR_CREATE: "Error to create a new cliente",
    COLABORADOR_ERROR_CREATE: "Error to create a new Colaborador",
    CLIENT_ERROR_CREATE_NIF: "Cliente already exists",
    VALIDATION_ERROR: "Invalid request",
    SUCCESS: "Success",
    ERROR: "Error",
    DADO_CONTACTO_TIPO_ERRO: "O tipo não corresponde ao ENUN",
    PROCESSO_CREATED: "Processo created successfully",
    PROCESSO_ERROR_TO_CREATED: "Error to Processo create a new process",
    PROCESSO_NOT_FOUND: "Id do Processo não encontrado"
}

const COLABORADOR = {
   COLABORADOR_CREATED: "Colaborador created successfully",
   COLABORADOR_ERROR_CREATED: "Error to create a new Colaborador",
   COLABORADOR_LIST_ALL: "List of Colaborador",
   COLABORADOR_ERROR_LIST_ALL: "Error to get the List of Colaborador"
}

const DADOS_CONTACTO = {
    DADOS_CONTACTO_CREATED: "Dados Contacto created successfully",
    DADOS_CONTACTO_ERROR_CREATED: "Error to create a new Dados Contacto"
 }


 const DADOS_IDENTIFICACAO = {
    DADOS_IDENTIFICACAO_CREATED: "Dados Identicacao created successfully",
    DADOS_IDENTIFICACAO_ERROR_CREATED: "Error to create a new Dados Identicacao"
 }

module.exports = {
    errosConst, 
    COLABORADOR,
    DADOS_CONTACTO,
    DADOS_IDENTIFICACAO,
}