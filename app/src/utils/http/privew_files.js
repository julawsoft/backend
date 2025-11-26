const { API_VERSION } = require('../../const');

function getPreviewPath(req, publicPath) {
  try {
    return `${req.protocol}://${req.get("host")}${API_VERSION}preview_anexo/${publicPath}`;
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = {
  getPreviewPath
};