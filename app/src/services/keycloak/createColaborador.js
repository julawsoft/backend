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
        return { "uuid": returnUserKeycloak.id }
    }catch (e) { 
        console.log("error creating keycloak", e)
        throw new Error(e.errorMessage)
    }
}
module.exports = createKeycloakColaborador