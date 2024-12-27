// const {KcAdminClient} = require('@keycloak/keycloak-admin-client')
const KcAdminClient = require('keycloak-admin-client');
const { realm, authServerURL, clientId, userAdmin, pwdAdmin, grantType, clientSecret } = require('./config.json');
const logger = require('../../utils/logger/logger');

console.log(realm, authServerURL, clientId, userAdmin, pwdAdmin)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

class KeycloakConnection {

  static instance = null;

  constructor() {
      if(KeycloakConnection.instance){
        return KeycloakConnection.instance
      }

      this.init()

      KeycloakConnection.instance = this
  }

  async init() {

      KcAdminClient({
        baseUrl: authServerURL,
        realmName: realm,
        username: userAdmin,
        password: pwdAdmin,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
      }).then((response) => {
        KeycloakConnection.instance = response;
        logger.info(`keycloak server connected successfully`)
      }).catch((error) => {
        logger.error(`${error.error ?? error}`)
      }).finally(() => {
        logger.http(`keycloak server`)
      })

       return this
  }


}

module.exports = KeycloakConnection
