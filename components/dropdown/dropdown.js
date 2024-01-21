const selectIcon = document.querySelector(".select-icon");
const menu = document.querySelector(".menu");
const options = document.querySelectorAll(".menu-item");
const selected = document.querySelector(".selected");

selectIcon.addEventListener('click', () => {
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
    selectIcon.classList.toggle("rotate");
})

options.forEach(option => {
    option.addEventListener('click', () => {
        let selectedOption = option.innerText;
        selected.innerText = selectedOption;

        menu.style.display = "none";
        selectIcon.classList.remove("rotate");
    })

})


const filterIcon = document.querySelector(".filter-icon");
const filterList = document.querySelector(".filter-list");
const filterOptions = document.querySelectorAll(".filter-item");
const filterText = document.querySelector(".filter-text");

filterIcon.addEventListener('click', () => {
    filterList.style.display = (filterList.style.display === "block") ? "none" : "block";
    filterIcon.classList.toggle("rotate");
})

filterOptions.forEach(option => {
    option.addEventListener('click', () => {
        let selectedOption = option.innerText;
        filterText.innerText = selectedOption;

        filterList.style.display = "none";
        filterIcon.classList.remove("rotate");
    })

})

