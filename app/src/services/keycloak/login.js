const Keycloak = require("../../infra/keycloak")

/**
*  @param {string} username 
*  @param {string} password 
*/
async function loginKeycloak({username, password }) {

    try {
        const returnUserKeycloak = await Keycloak.login(username, password)
        return returnUserKeycloak 
    }catch (e) {
        if(String(e).includes("Invalid user credentials"))
            throw new Error("Invalid user credentials")

        if(String(e).includes("Failed to fetch"))
            throw new Error("Keycloak server is unavailable")
    
        if(String(e).includes("invalid_grant (Account disabled)"))
            throw new Error("Usuário desativado")

        throw new Error(e.errorMessage ?? e.message ?? e)
    }
}

module.exports = loginKeycloak