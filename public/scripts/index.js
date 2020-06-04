//Esconderr e aparecer o modal
const serchButton = document.querySelector("#page_home main a ")
const modal = document.querySelector("#modal")
const closeModal = document.querySelector("#modal .header a")

serchButton.addEventListener("click", () => {
    modal.classList.toggle("hide")
})

closeModal.addEventListener("click", () => {
    modal.classList.add("hide")
})