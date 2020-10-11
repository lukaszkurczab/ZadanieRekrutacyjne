const selected = document.querySelector(".selected");
const optionsContainder = document.querySelector(".optionsContainer");
const options = document.querySelectorAll(".option");
const searchBox = document.querySelector(".searchBox input");
const employeeError = document.querySelector("#employeeError")
const pracownik = selected.innerHTML;
let chosenPerson;

selected.addEventListener("click", (e) => {
  optionsContainder.classList.toggle("active");

  searchBox.value = "";
  filterList("");

  if (optionsContainder.classList.contains("active")) {
    searchBox.focus();
  }

  emoloyeeName();
});

options.forEach(option => {
  option.addEventListener("click", () => {

    chosenPerson = option.querySelector(".name").innerHTML;
    selected.innerHTML = `<span class="name" id="employeeInput">${chosenPerson}</span>
    <span class="label">Pracownik</span>;`
    didChosenPerson();
    emoloyeeName();
  })

  /*zamykanie po kliknięciu poza obszar wyboru*/
  window.addEventListener('mouseup', (e) => {
    if (
      e.target == document.querySelector("body") || (
        !e.target.parentNode.classList.contains("option") &&
        !e.target.parentNode.parentNode.classList.contains("option") &&
        !e.target.classList.contains("searchBox") &&
        !e.target.parentNode.classList.contains("searchBox") &&
        e.target.parentNode != optionsContainder &&
        e.target != selected
      )
    ) {
      optionsContainder.classList.remove("active");

      if (selected.classList.contains("error")) {
        const employeeInput = document.querySelector("#employeeInput")

        employeeInput.innerHTML == "Pracownik" ? selected.classList.add("error") : selected.classList.remove("error");
        employeeInput.innerHTML == "Pracownik" ? employeeError.style.visibility = "visible" : employeeError.style.visibility = "hidden";
      }
    }

  });
});


function emoloyeeName() {
  if (selected.innerHTML != pracownik) {
    selected.style.color = "black"
  }
};

function didChosenPerson() {
  options.forEach(person => {
    if (person.querySelector(".name").innerHTML == chosenPerson) {
      person.classList.add("chosen")
    } else {
      person.classList.remove("chosen")
    }
  })
};

/* Obsługa wyszukiwania */
searchBox.addEventListener("keyup", (e) => {
  filterList(e.target.value);
});

function filterList(searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  options.forEach(option => {
    let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
    if (label.indexOf(searchTerm) != -1) {
      option.style.display = "block";
    } else {
      option.style.display = "none";
    }
  })
}

/* WALIDACJA PÓL */
const companyNameLabel = document.querySelector("#comapnyNameLabel")
const companyNameInput = document.querySelector("#companyNameInput")
const companyNameError = document.querySelector("#companyNameError")

companyNameInput.addEventListener("keyup", () => {
  companyNameInput.value != "" ? companyNameLabel.style.visibility = "visible" : companyNameLabel.style.visibility = "hidden"
  companyNameInput.value == "" ? companyNameError.style.visibility = "visible" : companyNameError.style.visibility = "hidden"
})

companyNameInput.addEventListener("focusout", (e) => {
  companyNameInput.value == "" ? companyNameInput.classList.add("error") : companyNameInput.classList.remove("error")
  companyNameInput.value == "" ? companyNameError.style.visibility = "visible" : companyNameError.style.visibility = "hidden"
})

optionsContainder.addEventListener("focusout", () => {
  const employeeInput = document.querySelector("#employeeInput")

  employeeInput.innerHTML == "Pracownik" ? selected.classList.add("error") : selected.classList.remove("error");
  employeeInput.innerHTML == "Pracownik" ? employeeError.style.visibility = "visible" : employeeError.style.visibility = "hidden";
})