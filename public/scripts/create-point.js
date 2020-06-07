
function populateUFs() {
    const UfSelect = document.querySelector("select[name=uf]")
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados").then( res => res.json() )
    .then( states => {

        for ( state of states) {
            UfSelect.innerHTML += `<option value="${state.id}">${state.nome}<option>` 
        }
    })
        
}

populateUFs()


function getCities (event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ ufValue }/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url).then( res => res.json() ).then( cities => {

        for ( city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}<option>` 
        }

        citySelect.disabled = false
    })
}

document.querySelector("select[name=uf]").addEventListener("change", getCities)

//Itens de coleta

const itemsSelected = document.querySelectorAll(".items-grid li")

let selectedItems = []

for ( item of itemsSelected ) {
    item.addEventListener("click", handleSelectedItem)

    if (item.classList != "") {
        selectedItems.push(item.dataset.id)
    }
}
const collectedItems = document.querySelector("input[name=items]")

function handleSelectedItem (event) {
    const listItem = event.target

    listItem.classList.toggle("selected")

    itemId = listItem.dataset.id

    //Adicinonar, apagar, atualizar quais itens de coleta foram selecionados

    const alredySelected = selectedItems.findIndex( item => item == itemId)

    //apagar
    if (alredySelected != -1) {
        const filteredItems = selectedItems.filter( item => item != itemId)

        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId) //adicionar
    }

    collectedItems.value = selectedItems
}