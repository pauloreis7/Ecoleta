//Criar servidor
const express = require("express")
const server = express()

//Pegar as rotas
const routes = require("./routes")

//Pegar banco de dados
const db = require("./database/db")

//Configurar servidor

server.use(express.static("public"))
server.use(routes)
server.use(express.urlencoded( { extended: true } ) )

//Configuarar tempate Nunjucks
const nunjucks = require("nunjucks")

nunjucks.configure ("src/views", {
    express: server,
    noCache: true,
    watch: true
})

//Ligar servidor
server.listen(3000)