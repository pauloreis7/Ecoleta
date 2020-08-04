//Importar o sqlite3

const sqlite3 = require('c').verbose()

//Craiar o objeto que irá fazer alterações no banco de dados

const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

 db.serialize(()=> {

//     //Criar uma tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

//     //Inserir dados na tabela
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             adress,
//             adress2,
//             state,
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//     `

//     const values = [
//         "https://images.unsplash.com/photo-1560036039-801e62d634b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
//         "Papersider",
//         "Ghilherme Gemballa, Jardim América",
//         "Número 260",
//         "Santa Catarina",
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterInsertData(err) {
//         if (err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData)

    //Consultar dados da tabela
    // db.all(`SELECT * FROM places`, function (err, rows) {
    //     if (err) {
    //        return console.log(err)
    //     }

    //     console.log("Aqui estão seus registros")
    //     console.log(rows)
    // })

    //Deletar dados da tabela
      // db.run(`DELETE FROM places WHERE id = ?`,  function (err) {
      //   if (err) {
      //     return console.log(err)
      //   }

      //   console.log("Registro deletado com sucesso!")
      // })

})

//Obs: Quando uma função reside dentro de um objeto da-se o nome de método