const { validationResult } = require('express-validator');

const { StatusCodes } = require('http-status-codes');
const errosConst = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const loginService = require('../../services/auth/loginService');
const updatePasswordKeycloak = require('../../services/keycloak/updataPassword');

async function updatePasswordController(req, res) {

        try {
               

               
                const dataBody = req.body
                if (!dataBody.password || !dataBody.userId) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, 'Password ou UserId, são obrigatórios', {}, '')
                }
                
                const dataReturned = await updatePasswordKeycloak(dataBody.password, dataBody.userId)
            
                return responseHttp(res, StatusCodes.OK, errosConst.CLIENT_CREATED, dataReturned, [])

        } catch (e) {
                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE, {}, e.message)
        }
}

module.exports = updatePasswordController