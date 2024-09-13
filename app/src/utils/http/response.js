/**
 * @param {Object} request
 * @param {number} statusCode
 * @param {string} message
 * @param {Object | Array} data
 * @param {Object | Array} erros
 */
async function responseHttp (request, statusCode, message, data, erros) {
    return request.status(statusCode).send({
        "status": statusCode,
        "message": message,
        "data": data,
        "erros": erros
      })
}
module.exports = responseHttp