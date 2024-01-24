const darkBtn = document.getElementById('darkBtn');
const lightBtn = document.getElementById('lightBtn');
const body = document.querySelector('body');

const modeLocal = localStorage.getItem('mode');

if(modeLocal){
    body.classList.add("dark-mode");
    darkBtn.classList.toggle("hidden");
    lightBtn.classList.toggle("hidden");
}

function toggleBtn() {
    darkBtn.classList.toggle('hidden');
    lightBtn.classList.toggle('hidden');
    body.classList.toggle('dark-mode');
}

darkBtn.addEventListener('click', () =>{
    toggleBtn();
    localStorage.setItem("mode", 'dark-mode');
})

lightBtn.addEventListener('click', () =>{
    toggleBtn();
    localStorage.setItem('mode', '')
})