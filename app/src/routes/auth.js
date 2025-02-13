const express = require('express');


const validateLogin = require('../middlewares/validateLogin.js');
const loginController = require('../controllers/auth/loginController.js');
const updatePasswordController = require('../controllers/auth/updatePasswordController.js');

const authRouter = express.Router()

const ROUTES_PATH = {
    INDEX: '/login'
}

authRouter.post(ROUTES_PATH.INDEX, validateLogin, loginController)
authRouter.post('/update_password', updatePasswordController)

module.exports = authRouter