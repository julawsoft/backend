const express  = require('express')
const cors = require('cors')
const path = require('path')

const routesRoot = require('./routes/index.js')
const { API_VERSION, STORAGE_PATH }  = require('./const.js')
const { corsOptions } = require('./cors.js')
const SequelizeConnection = require('./persistencia/SequelizeConnection.js')

new SequelizeConnection().init()

const app = express()

app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(API_VERSION, cors(corsOptions), routesRoot)
app.use(API_VERSION + 'preview_anexo', express.static(STORAGE_PATH));

module.exports = app
