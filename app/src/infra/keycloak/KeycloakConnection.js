let kcInstance = null;

async function createKeycloakClient() {
  if (kcInstance) {
    return kcInstance;
  }

  const { default: KcAdminClient } = await import("@keycloak/keycloak-admin-client");

  const kc = new KcAdminClient({
    baseUrl: process.env.KEYCLOAK_BASE_URL,
    realmName: process.env.KEYCLOAK_REALM,
  });

  await kc.auth({
    grantType: "password",
    clientId: process.env.KEYCLOAK_CLIENT_ID,
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
    username: process.env.KEYCLOAK_USER,
    password: process.env.KEYCLOAK_PASSWORD
  });

  kc.setConfig({
    realmName: process.env.KEYCLOAK_REALM,
  });

  kcInstance = kc; // Singleton
  return kcInstance;
}

module.exports = { createKeycloakClient };
