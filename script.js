/* MENU toggle */ 
const mainMenu = document.querySelector(".mainMenu");
const closeMenu = document.querySelector(".closeMenu");
const openMenu = document.querySelector(".openMenu");


openMenu.addEventListener("click",show);
closeMenu.addEventListener("click",close);


function show () {
    mainMenu.style.display = 'flex';
    mainMenu.style.top = '0';
}


function close() {
    mainMenu.style.top = '-100%';
}

/* dropdown input */
const toggle = document.querySelector(".toggle"),
 selectBtn = toggle.querySelector(".select-btn"),
 options = toggle.querySelector(".options");


let students = ["Студенти од дизајн", "Студенти од програмирање", "Студенти од data science", "Студенти од маркетинг"];

function addStudent() {
    students.forEach(student => {
      let li = `<li onclick="updateStudents(this)">${student}</li>`;
      options.insertAdjacentHTML("beforeend", li);
    });
}
addStudent();

function updateStudents(selectedLi) {
    toggle.classList.remove("active");
    selectBtn.firstElementChild.innerText = selectedLi.innerText;
}

selectBtn.addEventListener("click", () => {
    toggle.classList.toggle("active");
});

function showError(errorElement, errorMessage) {
    document.querySelector("."+errorElement).classList.add("display-error");
    document.querySelector("."+errorElement).innerHTML = errorMessage; 
}

/* display error */
function clearError() {
    let errors = document.querySelectorAll(".error");
    for(let error of errors) {
        error.classList.remove("display-error");
    }
}

let form = document.forms['sign-up-form'];
form.onsubmit = function(event) {
    clearError();

    
    if(form.imeiprezime.value === "") {
        showError("imeiprezime-error", "Внесете го вашето име и презиме");
        return false;
    }

    if(form.imenakompanija.value === "") {
        showError("imenakompanija-error", "Внесете го името на вашата компанија");
        return false;
    }

    if(form.email.value === "") {
        showError("email-error", "Внесете валиден имејл");
        return false;
    }

    if(form.telefon.value === "") {
        showError("telefon-error", "Внесете валиден телефонски број");
        return false;
    }
    

    document.querySelector(".success").classList.add("display-success");
    document.querySelector(".success").innerHTML = "Вашата најава е успешна.";

    event.preventDefault();

}

