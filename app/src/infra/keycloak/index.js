const keycloakConnection = require('./KeycloakConnection.js');
const { Issuer } = require('openid-client');

const { realm, authServerURL, clientId, userAdmin, pwdAdmin, grantType, clientSecret, discover } = require('./config.json');

/*
const kcAdminClient = async () => {
  const kcAdminClientIni = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE_URL,
    realmName: process.env.KEYCLOAK_REALM,
  });

  async function auth() {
    await kcAdminClientIni.auth({
      username: `${process.env.KEYCLOAK_USER_NAME}`,
      password: `${process.env.KEYCLOAK_USER_PASS}`,
      grantType: 'password',
      clientId: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
    });
  }

  if (kcAdminClientIni.accessToken === undefined) await auth();

  return kcAdminClientIni;
};

export { grantType, kcAdminClient, kcClient };

*/

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

    if (username == null || username == undefined) return new Error("Username cannot be null or undefined");

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

      console.log("creating user in keycloak", keycloakConnection.instance.users.create)

      const keycloakResponse = await keycloakConnection.instance.users.create(realm, userDataToSave)

      console.log("keycloakResponse ", keycloakResponse)

      return keycloakResponse;
    } catch (e) {
      console.log("error creating user in keycloak", e)
      throw e;
    }

  }


  /**
  *  @param {string} username 
  *  @param {string} password 
  */
  static async login(username, password) {

    const payload = {
      username: username,
      password: username,
    }


    try {


        const keycloakIssuer = await Issuer.discover(
          `${discover}`,
        );

       // console.log("keycloakIssuer ", keycloakIssuer)

        const cliente =  new keycloakIssuer.Client({
            client_id: `${clientId}`,
            client_secret: `${clientSecret}`,
        });

        const tokenSet = await cliente.grant({
          grant_type: grantType,
          username,
          password,
          scope: 'openid profile email', 
        });  
        
        
        // console.log(">>>>>>>>>>>>> ", keycloakConnection.instance)
        const userInfo = await cliente.userinfo(tokenSet.access_token)
       
       
        //console.log(">>>>>>>>>>>>>>>>>> ", tokenSet)
        //console.log(">>>>>>>>>>>>>>>>>> ", userInfo)

      return {
          tokenSet: tokenSet,
          userInfo: userInfo,
      }
    } catch (e) {
      throw e;
    }

  }


  async deleteUser(username) { }
  async updateUser(username, email, firstName, lastName) { }
  async getUsers() { }
  async getClient(clientId) { }
  async updateClient(clientId, clientName, enabled, redirectUris, webOrigins) { }
  async deleteClient(clientId) { }
  async getRealmRoles() { }
  async getRealmUsers() { }
  async getRealmClients() { }
  async getRealmClient(clientId) { }
  async getRealmClientSecret(clientId) { }
  async updateRealmClientSecret(clientId, newSecret) { }
  async getRealmUser(username) { }
  async updateRealmUser(username, firstName, lastName, email) { }
  async deleteRealmUser(username) { }
  async getRealmUserGroups(username) { }
  async getRealmUserRealmRoles(username) { }
  async getRealmUserClientRoles(username, clientId) { }
  async getRealmUserFederatedIdentities(username) { }
  async getRealmUserFederatedIdentity(username, federatedId) { }
  async deleteRealmUserFederatedIdentity(username, federatedId) { }
  async getRealmUserProtocolMappers(username) { }

}

module.exports = Keycloak;
