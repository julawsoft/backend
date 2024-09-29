const express = require('express');


const validateLogin = require('../middlewares/validateLogin.js');
const loginController = require('../controllers/auth/loginController.js');

const authRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/login'
}

authRouter.post(ROUTES_PATH.INDEX, validateLogin, loginController)

module.exports = authRouter