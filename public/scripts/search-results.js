
const deleteButtons = document.querySelectorAll("#deleteButton")
const editButtons = document.querySelectorAll("#editButton")

//Confirmação do delete
for ( deleteButton of deleteButtons) {

    deleteButton.addEventListener("submit", function (event) {
        const comfirm = confirm("Deseja mesmo Deletar o local ?")
        
        if (!comfirm) {
            event.preventDefault()
        }
    })
}