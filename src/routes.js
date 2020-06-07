const express = require('express')
const db = require("./database/db")
const controller = require('./controller')

const routes = express.Router()
routes.use(express.urlencoded( { extended: true } ) )

//Configurar as rotas

//Home
routes.get("/", controller.index)

//Página criar ponto
routes.get("/create", controller.create)

//Criar ponto
routes.post("/savepoint", controller.post)

//Pesquisar ponto
routes.get("/search", controller.search)

//Deletear ponto
routes.post("/delete", controller.delete)

//Página editar ponto
routes.get("/edit/:id", controller.edit)

//Editar Ponto
routes.post("/edited/:id", controller.put)

module.exports = routes