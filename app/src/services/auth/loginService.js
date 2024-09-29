const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador");
const loginKeycloak = require("../keycloak/login");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

/**
* @param {string} username
* @param {string} password
*/
async function loginService({ username, password }) {
           
    // const defaultPassword = "julaw"
    const returnLogin = await loginKeycloak({
        username,
        password,
    })

    const dataColaborador = await getAllByKeyValueColaborador("uuid", returnLogin.userInfo.sub)

    const tipoColadorador = await listTipoColaboradorById(dataColaborador[0].dataValues.tipo_colaborador_id) 
    return await {
            ...dataColaborador[0].dataValues, 
            tipo: tipoColadorador,
            auth: {
                accessToken: returnLogin.tokenSet.access_token,
                refreshToken: returnLogin.tokenSet.refresh_token,
                userInfo: returnLogin.userInfo
            }
    }

}


module.exports = loginService