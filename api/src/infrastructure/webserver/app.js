import express  from 'express'
import cors from 'cors'

import routesRoot from './routes/index.js'
import { API_VERSION } from './util.js'
import { corsOptions } from './cors.js'

const app = express()

app.disable('x-powered-by');
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));
 
app.use(API_VERSION, cors(corsOptions), routesRoot)

export default app
