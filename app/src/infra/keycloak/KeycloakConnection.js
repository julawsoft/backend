// const {KcAdminClient} = require('@keycloak/keycloak-admin-client')
const KcAdminClient = require('keycloak-admin-client');
const { realm, authServerURL, clientId, userAdmin, pwdAdmin, grantType, clientSecret } = require('./config.json');
const logger = require('../../utils/logger/logger');

console.log(realm, authServerURL, clientId, userAdmin, pwdAdmin)

class KeycloakConnection {

  static instance; 

  constructor() {
    setTimeout(() => {
      return this.init()
    }, 2000)
  }

  async init() {
      if (!this.instance) {
        KcAdminClient({
          baseUrl: authServerURL,
          realmName: realm,
          username: userAdmin,
          password: pwdAdmin,
          grant_type: grantType,
          client_id: clientId,
          // client_secret: clientSecret,
        }).then((response) => {
          // console.log("response", response)
          this.instance = response;
          logger.info(`keycloak server connected successfully`)
        }).catch((error) => {
          console.log("error : >>><<< ", error)
          logger.error(`${error.error ?? error}`)
        }).finally(()=> {
            logger.http(`keycloak server`)
        })
      }
  }

  static getInstance() {
    return this.instance ? this.instance: new KeycloakConnection();
  }

}

module.exports = KeycloakConnection.getInstance()
