const newBtn = document.querySelector(".header-btn");
const addInvoiceModal = document.querySelector(".invoice");
const discardBtn = document.querySelector(".discard-btn");
const overlay = document.querySelector(".overlay");


newBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    addInvoiceModal.style.display = "block";
    overlay.style.display = "block";

})

function closeModal() {
    addInvoiceModal.style.display ="none"
    overlay.style.display ="none"
}