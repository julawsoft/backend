const KeycloakConnection = require('./KeycloakConnection.js');
const { Issuer } = require('openid-client');
const { jwtDecode } = require("jwt-decode");

const { realm, authServerURL, clientId, userAdmin, pwdAdmin, grantType, clientSecret, discover } = require('./config.json');

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

    try {

      const keycloak =  new KeycloakConnection()
      const keycloakConnection = await keycloak.init()

      const keycloakResponse = await keycloakConnection.users.create(realm, userDataToSave)
      return keycloakResponse;
    } catch (e) {
      throw e;
    }

  }


  static async removeUser(userId) {

    if (userId == null || userId == undefined) return new Error("userId cannot be null or undefined");

    try {

      const keycloak =  new KeycloakConnection()
      const keycloakConnection = await keycloak.init()

      const keycloakResponse = await keycloakConnection.users.remove(realm, userId)
      return keycloakResponse;
    } catch (e) {
      throw e;
    }

  }


  /**
  *  @param {string} username 
  *  @param {string} password 
  */
  static async login(username, password) {

    try {

      const keycloakIssuer = await Issuer.discover(
        `${discover}`,
      );

      const cliente = new keycloakIssuer.Client({
        client_id: `${clientId}`,
        client_secret: `${clientSecret}`,
      });

      const tokenSet = await cliente.grant({
        grant_type: grantType,
        username,
        password,
        scope: 'openid profile email',
      });

      const userInfo = await cliente.userinfo(tokenSet.access_token)
      const decoded = jwtDecode(tokenSet.access_token);

      const roles = decoded.resource_access[clientId] && decoded.resource_access[clientId].roles
        ? decoded.resource_access[clientId].roles
        : [];

      return {
        tokenSet: tokenSet,
        userInfo: userInfo,
        //groups: groups ? groups.map(group => group.name) : [],
        roles: [...roles],
      }

    } catch (e) {
      console.log(e)
      throw e;
    }

  }


  async getUserGroups(userId) {

  }
  async getUserRoles(userId) {

  }
  async getRolesByGroup(groupId) {

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
