// const {KcAdminClient} = require('@keycloak/keycloak-admin-client')
const KcAdminClient = require('keycloak-admin-client');
const { realm, authServerURL, clientId, userAdmin, pwdAdmin, grantType, clientSecret } = require('./config.json');
const logger = require('../../utils/logger/logger');

console.log(realm, authServerURL, clientId, userAdmin, pwdAdmin)
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

class KeycloakConnection {

  static instance;

  constructor() {
      // this.init()
      if (!this.instance) {
        console.log("this.instance ",  this.instance)
        KcAdminClient({
          baseUrl: authServerURL,
          realmName: realm,
          username: userAdmin,
          password: pwdAdmin,
          grant_type: grantType,
          client_id: clientId,
          client_secret: clientSecret,
        }).then((response) => {
          console.log("response keycloak connection >>>>>> ", response)
          this.instance = response;
          logger.info(`keycloak server connected successfully`)
        }).catch((error) => {
          console.log("error  keycloak connection : >>><<< ", error)
          logger.error(`${error.error ?? error}`)
        }).finally(() => {
          logger.http(`keycloak server`)
        })
      }else{
        console.log("else do instance ... >>>> ")
      }
  }

  async init() {
    if (!this.instance) {
      console.log("this.instance ",  this.instance)
      KcAdminClient({
        baseUrl: authServerURL,
        realmName: realm,
        username: userAdmin,
        password: pwdAdmin,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret,
      }).then((response) => {
        console.log("response keycloak connection >>>>>> ", response)
        this.instance = response;
        logger.info(`keycloak server connected successfully`)
      }).catch((error) => {
        console.log("error  keycloak connection : >>><<< ", error)
        logger.error(`${error.error ?? error}`)
      }).finally(() => {
        logger.http(`keycloak server`)
      })
    }else{
      console.log("else do instance ... >>>> ")
    }
  }

  static getInstance() {
    console.log("instanciou ... >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>  ", this.instance )
    setTimeout(() => {
      console.log("a instancia >>> ", this.instance)
    }, 3000)
    return this.instance ? this.instance : new KeycloakConnection();

   
  }

}

module.exports = KeycloakConnection.getInstance()
