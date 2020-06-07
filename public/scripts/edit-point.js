
let alredyItemsSelected = document.querySelectorAll(".items-grid li")
const newColectedItens = document.querySelector("input[name=items]")

document.querySelector("[name=city]").disabled = false

const newSelectedItems = []

 for ( itemSelected of alredyItemsSelected) {
    const itemId = itemSelected.dataset.id

    if (itemSelected.classList == "selected") {
        newSelectedItems.push(itemId)
    }

    newColectedItens.value = newSelectedItems
}