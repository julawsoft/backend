const express  = require('express')
const cors = require('cors')

const routesRoot = require('./routes/index.js')
const { API_VERSION }  = require('./const.js')
const { corsOptions } = require('./cors.js')

const SequelizeConnection = require('./persistencia/SequelizeConnection.js')

new SequelizeConnection().init()

const app = express()

app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
 
app.use(API_VERSION, cors(corsOptions), routesRoot)


module.exports = app
