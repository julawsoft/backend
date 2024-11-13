const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador");
const loginKeycloak = require("../keycloak/login");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

/**
* @param {string} username
* @param {string} password
*/
async function loginService({ username, password }) {
           
    const returnLogin = await loginKeycloak({
        username,
        password,
    })

    const dataColaborador = await getAllByKeyValueColaborador("uuid", returnLogin.userInfo.sub)

    const tipoColadorador = await listTipoColaboradorById(dataColaborador[0].tipo_colaborador_id) 
    return await {
            ...dataColaborador[0], 
            tipo: tipoColadorador,
            auth: {
                accessToken: returnLogin.tokenSet.access_token,
                refreshToken: returnLogin.tokenSet.refresh_token,
                userInfo: returnLogin.userInfo,
               // groups: returnLogin.groups,
                roles: returnLogin.roles,
            }
    }

}


module.exports = loginService