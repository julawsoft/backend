// const {KcAdminClient} = require('@keycloak/keycloak-admin-client')
const KcAdminClient = require("keycloak-admin-client");
const {
  realm,
  authServerURL,
  clientId,
  userAdmin,
  pwdAdmin,
  grantType,
  clientSecret
} = require("./config.json");
const logger = require("../../utils/logger/logger");

console.log(realm, authServerURL, clientId, userAdmin, pwdAdmin);
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

class KeycloakConnection {
  static instance = null;

  constructor() { }

  async init() {
    return new Promise((resolve) => {
      KcAdminClient({
        baseUrl: authServerURL,
        realmName: realm,
        username: userAdmin,
        password: pwdAdmin,
        grant_type: grantType,
        client_id: clientId,
        client_secret: clientSecret
      })
        .then((response) => {
          console.log("keycloak response >>>  ", response);
          KeycloakConnection.instance = response;
          resolve(response);
          logger.info(`keycloak server connected successfully`);
        })
        .catch((error) => {
          logger.error(`${error.error ?? error}`);
        })
        .finally(() => {
          logger.http(`keycloak server`);
        });
    });
  }
}

module.exports = KeycloakConnection;
