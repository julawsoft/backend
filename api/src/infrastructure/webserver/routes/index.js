import { Router } from "express";

const routesRoot = Router()

routesRoot.use('/', (req, res) => {
    return res.send({
        app: "JULAW",
        version: "1.0.0"
    })
})

export default routesRoot