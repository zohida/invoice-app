const newBtn = document.querySelector(".header-btn");
const addInvoiceModal = document.querySelector(".invoice");
const overlay = document.querySelector(".overlay");
const addbtn = document.getElementById("addBtn");
const randomID = generateRandomID();
const headerText = document.querySelector(".header-text")
const cardsBox = document.querySelector(".card");
const noInfo = document.querySelector(".no-info");
var statusBtnWrapper = document.querySelector(".status-btn-box");
var draftBtn = document.getElementById("btn-draft");
var saveBtn = document.getElementById("btn-save");
    
let itemIdCounter = 0;
let itemId; 
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
})

newBtn.addEventListener('click', (e) => {
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
    
    itemId = `item_${++itemIdCounter}`;
    
    const div = document.createElement("div");
    newInvoice.appendChild(div);
    div.innerHTML += `
    <ul class="items-type" id="${itemId}" style="list-style: none;">
    <li class="items-name">
    <input class="items-name" type="text" placeholder="Item Name" id="itemName_${itemId}">
    </li>
    <li class="items-qty">
    <input class="qty" type="number" placeholder="Qty." id="itemQty_${itemId}" onchange="calculateTotal('${itemId}')">
    </li>
    <li class="items-price">
    <input class="price" type="text" placeholder="Price" id="itemPrice_${itemId}" onchange="calculateTotal('${itemId}')">
    </li>
    <li class="items-total">
    <p class="total" id="itemTotal_${itemId}">0</p>
    </li>
    <li class="items-total">
    <button class="btn trash-btn" data-item-id="${itemId}" onclick="handleDelete('${itemId}')">
    <img src="./images/delete.svg" alt="Trash icon">
    </button>
    </li>
    </ul>`;
    
    const deleteBtn = div.querySelector('.trash-btn');
    deleteBtn.addEventListener('click', () => handleDelete(itemId));
    
    calculateTotal(itemId);
});

function handleDelete(itemId) {
    const itemToRemove = document.getElementById(itemId);
    
    if (itemToRemove) {
        itemToRemove.remove();
    } else {
        console.error(`Element with ID ${itemId} not found`);
    }
}


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
    
    const itemQtyInput = document.getElementById(`itemQty_${itemId}`);
    const itemPriceInput = document.getElementById(`itemPrice_${itemId}`);
    
    if (itemQtyInput && itemPriceInput) {
        const itemQty = parseFloat(itemQtyInput.value) || 0;
        const itemPrice = parseFloat(itemPriceInput.value) || 0;
        const total = itemQty * itemPrice;
        
        const totalElement = document.getElementById(`itemTotal_${itemId}`);
        totalElement.textContent = total.toFixed(2);
        closeModal();
        form.reset();
        
        cards.push({ id: generateRandomID(), date: date, name: nameVal, completed: false, total: total });
        setCards();
        showCards();
    } else {
        console.error("Could not find itemQtyInput or itemPriceInput elements.");
    }
});

function calculateTotal(itemId) {
    const itemQtyInput = document.getElementById(`itemQty_${itemId}`);
    const itemPriceInput = document.getElementById(`itemPrice_${itemId}`);
    const totalElement = document.getElementById(`itemTotal_${itemId}`);
    
    const itemQtyValue = itemQtyInput.value;
    const itemPriceValue = itemPriceInput.value;
    
    const itemQty = parseFloat(itemQtyValue) || 0;
    const itemPrice = parseFloat(itemPriceValue) || 0;
    const total = itemQty * itemPrice;
    
    
    totalElement.textContent = total.toFixed(2);
}



function setCards() {
    localStorage.setItem('card', JSON.stringify(cards));
}

function showCards(){
    const cards =JSON.parse(localStorage.getItem('card'));
    cardsBox.innerHTML = '';
    cards.forEach((item,i) => {
        cardsBox.innerHTML +=  `<div class="card-wrapper">
        <p class="card-id">#<span class="card-id-number">${item.id}</span></p>
        <p class="card-date">Due  <span class="card-time">${item.date}</span></p>
        <p class="card-info">${item.name}</p>
        <p class="card-amount">£ ${item.total ? item.total.toFixed(2) : '0.00'}</p>
        <div class="status-btn-box">${chooseStatus.}
        </div>
        <button class="btn-status btn">
        <a href="../../pages/status/status.html">
        <img src="../../images/card-arrow.svg" alt="Arrow">
        </a>
        </button>
        </div>`
        if(cards.length < 0) {
            return  headerText.innerHTML = `No invoices`;
        } else if(cards.length <= 1 && cards.length > 0) {
            return headerText.innerHTML = `There is total ${i+1} invoice`
        }else {
            return headerText.innerHTML = `There are total ${i+1} invoices`
        }
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




    function chooseStatus() {
        if (draftBtn && saveBtn) {
            if (draftBtn.onclick) {
                statusBtnWrapper.innerHTML = `<button class="draft-btn">
                    <span class="status-btn-title">
                    Draft
                    </span>
                </button>`
            } else if (saveBtn.onclick) {
                statusBtnWrapper.innerHTML = `<button class="status-btn">
                    <span class="status-btn-title">
                    Pending
                    </span>
                </button>`
            }
        }
    }


