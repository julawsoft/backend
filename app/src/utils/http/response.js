/**
 * @param {Object} request
 * @param {number} statusCode
 * @param {string} message
 * @param {Object | Array} data
 * @param {Object | Array} errors
 */
async function responseHttp (request, statusCode, message, data, errors) {
    return request.status(statusCode).send({
        "status": statusCode,
        "message": message,
        "data": data,
        "errors": errors
      })
}
module.exports = responseHttp