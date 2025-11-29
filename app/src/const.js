const path = require('path');

const API_VERSION = "/api/v1/"
const STATIC_FILES = `${API_VERSION}/static_files/`
const PORT = process.env.API_PORT || 3000
const ROLES = {
    ROOT: "root",
    ADMIN: "administrativo",
    ADVOGADO: "advogado",
    ESTAGIARIO: "estagiario",
    CONSULTOR: "consultor",
    CLIENTE: "cliente",
}

const STORAGE_PATH = path.join(__dirname, '/storage');

module.exports = {
    API_VERSION,
    STATIC_FILES,
    PORT,
    ROLES,
    STORAGE_PATH,
}