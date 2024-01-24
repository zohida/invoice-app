const newBtn = document.querySelector(".header-btn");
const addInvoiceModal = document.querySelector(".invoice");
const discardBtn = document.querySelector(".discard-btn");
const overlay = document.querySelector(".overlay");
const addbtn = document.getElementById("addBtn");
const randomID = generateRandomID();
const cardNumber = document.querySelector("info-title");

const cardsBox = document.querySelector(".card");
const noInfo = document.querySelector(".no-info")
let cards = JSON.parse(localStorage.getItem('card'))
? JSON.parse(localStorage.getItem('card'))
: [];

document.addEventListener('DOMContentLoaded', () => {
    const storedCards = JSON.parse(localStorage.getItem('card'));

    if (storedCards && storedCards.length > 0) {
        cards = storedCards;
        showCards();
    } else {
        noInfo.classList.remove('hidden');
    }
});
newBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    addInvoiceModal.style.display = "block";
    overlay.style.display = "block";

})

function closeModal() {
    addInvoiceModal.style.display ="none"
    overlay.style.display ="none"
}

addbtn.addEventListener("click", (e) => {
    e.preventDefault();

const div = document.createElement("div");
newInvoice.append(div);
div.innerHTML += `
    <ul class="items-type"  style="list-style: none;">
       <li class="items-name">
          <input  class="items-name" type="text">
       </li> 
       <li class="items-qty">
          <input class="qty" type="number">
       </li>  
       <li class="items-price">
          <input class="price" type="text">
       </li>  
       <li class="items-total">
          <p class="total">0</p>
       </li>  
       <li class="items-total">
          <button class="btn trash-btn">
             <img src="./images/delete.svg" alt="Trash icon">
          </button>
       </li>                             
    </ul>`
});



    const form = document.querySelector(".form-modal");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); 
       
        const address = document.getElementById("address");
        const city = document.getElementById("city");
        const postcode = document.getElementById("postcode");
        const name1 = document.getElementById("name");
        const date = document.getElementById('date').value;

        const dateString = date;
        const originalDate = new Date(dateString);
        const options = { day: "numeric", month: "short", year: "numeric" };
        const formattedDate = originalDate.toLocaleDateString("en-US", options);

        

// address info       
       if(address.value.trim() == ""){
        address.classList.add("error")
        adresMsg.classList.remove('hidden');
        adresLbl.classList.add('error-message');
        return false;
       }else {
        address.classList.remove("error")
        adresMsg.classList.add('hidden');
        adresLbl.classList.remove('error-message');
        address.value.trim();
       }


// ///////////////////////   

if(city.value.trim() == ""){
    city.classList.add("error")
   cityMsg.classList.remove('hidden');
    cityLbl.classList.add('error-message');
    return false;
   }else {
   city.classList.remove("error")
    cityMsg.classList.add('hidden');
    cityLbl.classList.remove('error-message');
    city.value.trim();
   }


   // postcode//////////////
   if(postcode.value.trim() == ""){
    postcode.classList.add("error")
   postcodeMsg.classList.remove('hidden');
   postcodeLbl.classList.add('error-message');
    return false;
   }else {
    postcode.classList.remove("error")
        postcodeMsg.classList.add('hidden');
        postcodeLbl.classList.remove('error-message');
        postcode.value.trim();
   }


   if (name1.value.trim() == '') {
    name1.classList.add("error");
    nameMsg.classList.remove('hidden');
    nameLbl.classList.add('error-message');
    return false;
} else {
    name1.classList.remove("error");
    nameMsg.classList.add('hidden');
    nameLbl.classList.remove('error-message');
    address.value.trim();
}

    const nameVal = name1.value;

   form.reset();
   cards.push({id : randomID, date:date,  name : nameVal, completed:false});
   setCards();
   showCards();
    })
//     cards.push({id : randomID, date: address.value, name1 : name1.value, total : total(), completed:false})
// 

   



function setCards() {
    localStorage.setItem('card', JSON.stringify(cards));
}

function showCards(){
    const cards =JSON.parse(localStorage.getItem('card'));
    cardsBox.innerHTML = '';
    cards.forEach((item,i) => {
        const randomID = i;
        cardsBox.innerHTML +=  `<div class="card-wrapper">
        <p class="card-id">#<span class="card-id-number">RT3080</span></p>
        <p class="card-date">Due  <span class="card-time">19 Aug 2021</span></p>
        <p class="card-info">Jensen Huang</p>
        <p class="card-amount">£ 1,800.90</p>
        <button class="status-btn">
            <span class="status-btn-title">
                Pending
            </span>
        </button>
        <button class="btn-status btn">
            <a href="../../pages/status/status.html">
                <img src="../../images/card-arrow.svg" alt="Arrow">
            </a>
        </button>
    </div>`
});
    noInfo.classList.add('hidden');
}

function generateRandomID() {
    // Generate two random letters
    const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
                          String.fromCharCode(65 + Math.floor(Math.random() * 26));
  
    // Generate a random number between 1000 and 9999
    const randomNumber = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
  
    // Combine the random letters and number
    const randomID = `${randomLetters}${randomNumber}`;
  
    return randomID;
  }


document.addEventListener('keydown', (e) => {
    if(e.key == 'Escape'){
        closeModal()
    }
})