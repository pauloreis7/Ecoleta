//Criar servidor
const express = require("express")
const server = express()

//Configurar servidor

server.use(express.static("public"))

server.set("view engine", "html")

//Configuarar tempate Nunjucks
const nunjucks = require("nunjucks")

nunjucks.configure ("src/views", {
    express: server,
    noCache: true,
    watch: true
})

//Configurar as rotas
server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//Ligar servidor
server.listen(3000)