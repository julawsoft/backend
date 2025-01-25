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
async function removeKeycloakColaborador(userId) {

    try {
        const returnUserKeycloak = await Keycloak.removeUser(userId)
        return { returnUserKeycloak }
    }catch (e) { 
        console.log("error delete user keycloak", e)
        throw new Error(e)
    }
}
module.exports = removeKeycloakColaborador