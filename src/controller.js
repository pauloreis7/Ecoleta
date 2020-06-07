const db = require('./database/db')

exports.index = (req, res) => {
    return res.render("index.html")
}

exports.create = (req, res) => {
    return res.render("create-point.html")
}

exports.post = (req, res) => {
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

        //Falha ao cadastrar
    function afterInsertData(err) {
        if (err) {
            return res.render("create-point.html", { saved: false } )
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        //Sucesso ao cadastrar
        return res.render("create-point.html", { saved: true } )
    }
    db.run(query, values, afterInsertData)
}

exports.serach = (req, res) => {

    const search = req.query.search
    //Pesquisa vazia
    if (search == "") return res.render("search-results.html", { total: 0 })
    
    //Pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function (err, rows) {
        if (err) {
           return console.log(err) 
        }

        const total = rows.length

        //enviar dados do banco de dados para a págian web 
        return res.render("search-results.html", { places: rows, total })

    })
}