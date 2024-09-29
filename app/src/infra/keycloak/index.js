const { realm } = require('./config.json');
const keycloakConnection = require('./KeycloakConnection.js'); 

/**
 * Gerenciador integracao keycloak.
 * @class
 */
class Keycloak {
    
    /**
    *  @param {string} username 
    *  @param {string} password 
    *  @param {string} email 
    *  @param {string} firstName 
    *  @param {string} lastName 
    *  @param {string[]} groups 
    */
    static async createUser(username, password, email, firstName, lastName, groups) {

      console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  ")
      if(username == null || username == undefined) return new Error("Username cannot be null or undefined");

      const userDataToSave = {
        enabled: true,
        emailVerified: true,
        username: username,
        email: email,
        firstName: firstName,
        lastName: lastName,
        groups: [groups],
        credentials: [
          {
            type: "password",
            temporary: false,
            value: password,
          },
        ],
      }

      console.log("userdata to save", userDataToSave)

      try {

        console.log("creating user in keycloak",  keycloakConnection.instance.users.create)

        const keycloakResponse = await keycloakConnection.instance.users.create(realm, userDataToSave)
        
        console.log("keycloakResponse ", keycloakResponse)

        return keycloakResponse;
      }catch(e) {
        console.log("error creating user in keycloak", e)
        throw e;
      }

    }

    
    async deleteUser(username) {}
    async updateUser(username, email, firstName, lastName) {}
    async getUsers() {}
    async getClient(clientId) {}
    async updateClient(clientId, clientName, enabled, redirectUris, webOrigins) {}
    async deleteClient(clientId) {}
    async getRealmRoles() {}
    async getRealmUsers() {}
    async getRealmClients() {}
    async getRealmClient(clientId) {}
    async getRealmClientSecret(clientId) {}
    async updateRealmClientSecret(clientId, newSecret) {}
    async getRealmUser(username) {}
    async updateRealmUser(username, firstName, lastName, email) {}
    async deleteRealmUser(username) {}
    async getRealmUserGroups(username) {}
    async getRealmUserRealmRoles(username) {}
    async getRealmUserClientRoles(username, clientId) {}
    async getRealmUserFederatedIdentities(username) {}
    async getRealmUserFederatedIdentity(username, federatedId) {}
    async deleteRealmUserFederatedIdentity(username, federatedId) {}
    async getRealmUserProtocolMappers(username) {}

}

module.exports = Keycloak;
