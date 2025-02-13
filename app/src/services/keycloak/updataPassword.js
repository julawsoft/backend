const Keycloak = require("../../infra/keycloak")

/**
*  @param {string} username 
*  @param {string} password 
*/
async function updatePasswordKeycloak(password, userId) {
    try {
        const returnUserKeycloak = await Keycloak.updatePassword(password, userId)
        console.log("erro >>< ", returnUserKeycloak)
        return returnUserKeycloak 
    }catch (e) {
        throw new Error(e.errorMessage)
    }
}

module.exports = updatePasswordKeycloak