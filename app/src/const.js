const API_VERSION = "/api/v1/"
const STATIC_FILES = `${API_VERSION}/static_files/`
const PORT = process.env.API_PORT || 3000

module.exports = {
    API_VERSION,
    STATIC_FILES,
    PORT
}