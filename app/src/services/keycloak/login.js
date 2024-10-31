const Keycloak = require("../../infra/keycloak")

/**
*  @param {string} username 
*  @param {string} password 
*/
async function loginKeycloak({username, password }) {

    try {
        const returnUserKeycloak = await Keycloak.login(username, password)
        // console.log("returnUserKeycloak", returnUserKeycloak)
        return returnUserKeycloak 
    }catch (e) {
        if(String(e).includes("Invalid user credentials"))
            throw new Error("Invalid user credentials")

        throw new Error(e.errorMessage)
    }
}
module.exports = loginKeycloak