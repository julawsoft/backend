// src/infra/keycloak/Keycloak.js

const { createKeycloakClient } = require("./KeycloakConnection.js");
const { Issuer } = require("openid-client");
const { jwtDecode } = require("jwt-decode");
const { realm, clientId, clientSecret, discover, grantType } = require("./config.json");

class Keycloak {

  // ----------------------------------------------------------------------------
  // 🔹 CREATE USER
  // ----------------------------------------------------------------------------
  static async createUser(username, password, email, firstName, lastName, groupName) {
    if (!username) throw new Error("username is required");

    try {
     const kc = await createKeycloakClient();
      const user = await kc.users.create({
        realm,
        enabled: true,
        emailVerified: true,
        username,
        email,
        firstName,
        lastName,
      });

      const allGroups = await kc.groups.find({ realm });
      const group = allGroups.find(g => g.name.toLowerCase() === groupName[0].toLowerCase());

      if (!group)
        throw new Error("Group not found")
      
      await kc.users.addToGroup({
          realm,
          id: user.id,
          groupId: group.id,
      });
      
      await kc.users.resetPassword({
        realm,
        id: user.id,
        credential: {
          type: "password",
          value: password,
          temporary: false,
        },
      });

      return {
        status: true,
        userId: user.id,
        group: groupName,
      };

    } catch (err) {
      console.log("01", err)
      throw err;
    }
  }

  // ----------------------------------------------------------------------------
  // 🔹 REMOVE USER
  // ----------------------------------------------------------------------------
  static async removeUser(userId) {
    if (!userId) throw new Error("userId is required");

    try {
      const kc = await createKeycloakClient();
      await kc.users.del({ realm, id: userId });

      return { status: true };
    } catch (e) {
      console.error("Error removing user:", e);
      throw e;
    }
  }

  // ----------------------------------------------------------------------------
  // 🔹 LOGIN (openid-client)
  // ----------------------------------------------------------------------------
  static async login(username, password) {
    try {
      const keycloakIssuer = await Issuer.discover(discover);

      const client = new keycloakIssuer.Client({
        client_id: clientId,
        client_secret: clientSecret,
      });

      const tokenSet = await client.grant({
        grant_type: grantType,
        username,
        password,
        scope: "openid profile email",
      });

      const userInfo = await client.userinfo(tokenSet.access_token);
      const decoded = jwtDecode(tokenSet.access_token);

      const roles =
        decoded.resource_access?.[clientId]?.roles || [];

      return {
        token: tokenSet,
        userInfo,
        roles,
      };

    } catch (e) {
      console.error("Login error:", e);
      throw e;
    }
  }

  // ----------------------------------------------------------------------------
  // 🔹 UPDATE PASSWORD
  // ----------------------------------------------------------------------------
  static async updatePassword(userId, password) {
    if (!userId || !password) throw new Error("userId and password are required");

    try {
      const kc = await createKeycloakClient();

      await kc.users.resetPassword({
        realm,
        id: userId,
        credential: {
          type: "password",
          value: password,
          temporary: false,
        },
      });

      return { status: true };
    } catch (err) {
      console.error("Password update error:", err);
      return { status: false, message: err.message };
    }
  }
}

module.exports = Keycloak;
