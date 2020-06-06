//Criar servidor
const express = require("express")
const server = express()

//Pegar banco de dados
const db = require("./database/db")

//Configurar servidor

server.use(express.static("public"))

server.use(express.urlencoded( { extended: true } ) )

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
    return res.render("create-point.html", { saved: true })
})

server.post("/savepoint", (req, res) => {
    //req.body: Corpo do formulário

    const query = `
         INSERT INTO places (
             image,
             name,
             adress,
             adress2,
             state,
             city,
             items
         ) VALUES (?,?,?,?,?,?,?);
     `

    const values = [
        req.body.image,
        req.body.name,
        req.body.adress,
        req.body.adress2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true } )
    }

    db.run(query, values, afterInsertData)
})

server.get("/search", (req, res) => {
    
    //Pegar dados do banco de dados
    db.all(`SELECT * FROM places `, function (err, rows) {
        if (err) {
           return console.log(err) 
        }

        const total = rows.length

        //enviar dados do banco de dados para a págian web 
        return res.render("search-results.html", { places: rows, total })

    })
})

//Ligar servidor
server.listen(3000)