const express = require('express');


const validateLogin = require('../middlewares/validateLogin.js');

const authRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/login'
}

authRouter.post(ROUTES_PATH.INDEX, validateLogin, createClienteController)

module.exports = authRouter