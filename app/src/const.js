const API_VERSION = "/api/v1/"
const STATIC_FILES = `${API_VERSION}/static_files/`
const PORT = process.env.API_PORT || 3000
const ROLES = {
    ROOT: "root",
    ADMIN: "administrativo",
    ADV_JUNIOR: "adv_junior",
    ADV_SENIOR: "adv_senior",
    ADV_ESTAGIARIO: "adv_estagiario",
}

module.exports = {
    API_VERSION,
    STATIC_FILES,
    PORT,
    ROLES
}