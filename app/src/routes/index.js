const { Router }  = require("express")

const colaboradorRouter = require('./colaborador.js')
const tipoClienteRouter = require('./tipoCliente.js')
const clienteRouter = require('./cliente.js')

const INDEX_ROUTE= "/"
const routesRoot = Router()

routesRoot.use(colaboradorRouter)
routesRoot.use(tipoClienteRouter)
routesRoot.use(clienteRouter)

routesRoot.get(INDEX_ROUTE, (req, res) => {
    return res.send({
        app: "API JULAW",
        version: "1.0.0"
    })
})

module.exports = routesRoot