const { Router }  = require("express")

const colaboradorRouter = require('./colaborador.js')
const tipoClienteRouter = require('./tipoCliente.js')
const clienteRouter = require('./cliente.js')
const dadoContactoRouter = require("./dadoContacto.js")
const dadosIdentificacaoRouter = require("./dadoIdentificacao.js")
const authRouter = require("./auth.js")
const processo = require("./processo.js")
const processoTimeSheet = require("./processoTimeSheet.js")
const processoFacturas = require("./processoFacturas.js")
const despesasRouter = require("./despesas.js")
const timesheetsRouter = require("./timesheets.js")
const tasksRouter = require("./tasks.js")

const INDEX_ROUTE= "/"
const routesRoot = Router()

routesRoot.use(colaboradorRouter)
routesRoot.use(tipoClienteRouter)
routesRoot.use(clienteRouter)
routesRoot.use(dadoContactoRouter)
routesRoot.use(dadosIdentificacaoRouter)
routesRoot.use(authRouter)
routesRoot.use(processo)
routesRoot.use(processoTimeSheet)
routesRoot.use(processoFacturas)
routesRoot.use(despesasRouter)
routesRoot.use(timesheetsRouter)
routesRoot.use(tasksRouter)

routesRoot.get(INDEX_ROUTE, (req, res) => {
    return res.send({
        app: "API JULAW",
        version: "1.2.0"
    })
})

module.exports = routesRoot