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
        if (err) return res.render("create-point.html", { saved: false } )

        console.log("Cadastrado com sucesso")
        console.log(this)

        //Sucesso ao cadastrar
        return res.render("create-point.html", { saved: true } )
    }
    db.run(query, values, afterInsertData)
}

exports.search = (req, res) => {
    const search = req.query.search

    //Pesquisa vazia
    if (search == "") return res.render("search-results.html", { total: 0 })
    
    //Pegar dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${ search }%'`, function (err, rows) {
        if (err) return console.log(err)
            
        const total = rows.length

        //enviar dados do banco de dados para a págian web 
        return res.render("search-results.html", { places: rows, total })
    })
}

exports.delete = (req, res) => {
    const { id, city } = req.body

    function afterDeleteData(err) {
        if (err) return res.render("search-results.html", { deleteTrue: false } )
            
        console.log("Registro deletado com sucesso!")

        return res.render("search-results.html", { deleteTrue: true } )
    }

    db.run(`DELETE FROM places WHERE id = ${ id }`, afterDeleteData)
}

exports.edit = (req, res) => {
    const { id } = req.params
    
    db.all(`SELECT * FROM places WHERE id = ${ id }`, function (err, rows) {

        if (err) {
            return res.send("Erro ao encontrar local!")
        }

        let point = rows[0]

        point = {
            ...point,
            items: point.items.split(",")
        }

        return res.render("edit-point.html", { point })
    })
}

exports.put = (req, res) => {
    const { id } = req.params

    const query = `UPDATE places 
        SET image = ?,
        name = ?,
        adress = ?,
        adress2 = ?,
        state = ?,
        city = ?,
        items = ? WHERE id = ${ id }
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

    function afterUpdateData (err) {
        if (err) {
            return res.redirect(`/edit/${ id }`)
        }

        console.log("Registro Atualizado!")

        return res.redirect(`/search?search=${ req.body.city }`)
    }

    db.run(query, values, afterUpdateData)
}