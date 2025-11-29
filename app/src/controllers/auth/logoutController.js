const { validationResult } = require('express-validator');

const { StatusCodes } = require('http-status-codes');
const errosConst = require('../../utils/http/erros.Const');
const responseHttp = require('../../utils/http/response');
const loginService = require('../../services/auth/loginService');

async function logoutController(req, res) {

        try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                        return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.VALIDATION_ERROR, {}, errors.array())
                }
                const dataBody = req.body

                const dataReturned = await loginService(
                        {
                                "username": dataBody.username,
                                "password": dataBody.password
                        }
                )
            
                return responseHttp(res, StatusCodes.OK, errosConst.CLIENT_CREATED, dataReturned, [])

        } catch (e) {

                if(String(e).includes("Invalid user credentials"))
                        return responseHttp(res, StatusCodes.UNAUTHORIZED, errosConst.CLIENT_ERROR_CREATE, {}, "Usuário e/ou password, incorrectas")

                return responseHttp(res, StatusCodes.BAD_REQUEST, errosConst.CLIENT_ERROR_CREATE, {}, e.message)
        }
}


module.exports = logoutController