
const errosConst = {
    CLIENT_CREATED: "Cliente created successfully",
    CLIENT_ERROR_CREATE: "Error to create a new cliente",
    COLABORADOR_ERROR_CREATE: "Error to create a new Colaborador",
    CLIENT_ERROR_CREATE_NIF: "Cliente already exists",
    VALIDATION_ERROR: "Invalid request",
    SUCCESS: "Success",
    ERROR: "Error",
    DADO_CONTACTO_TIPO_ERRO: "O tipo não corresponde ao ENUN"
}

const COLABORADOR = {
   COLABORADOR_CREATED: "Colaborador created successfully",
   COLABORADOR_ERROR_CREATED: "Error to create a new Colaborador"
}

const DADOS_CONTACTO = {
    DADOS_CONTACTO_CREATED: "Dados Contacto created successfully",
    DADOS_CONTACTO_ERROR_CREATED: "Error to create a new Dados Contacto"
 }


module.exports = {
    errosConst, 
    COLABORADOR,
    DADOS_CONTACTO
}