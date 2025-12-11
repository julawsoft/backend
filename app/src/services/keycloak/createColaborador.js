const Keycloak = require("../../infra/keycloak")

/**
*  @param {Object}
*  @param {string} username 
*  @param {string} password 
*  @param {string} email 
*  @param {string} firstName 
*  @param {string} lastName 
*  @param {string[]} groups 
*/
async function createKeycloakColaborador({username, password, email, firstName, lastName, groups}) {

    try {
        const returnUserKeycloak = await Keycloak.createUser(username, password, email, firstName, lastName, groups)
        if(!returnUserKeycloak.status)
            throw new Error("Erro ao criar o usuario")
        return { "uuid": returnUserKeycloak.userId }
    }catch (e) { 
        console.log("03", e)
       throw(e)
    }
}

module.exports = createKeycloakColaborador
