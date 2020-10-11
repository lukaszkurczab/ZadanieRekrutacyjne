const taskNameLabel = document.querySelector("#taskNameLabel")
const taskNameInput = document.querySelector("#taskNameInput")
const taskNameError = document.querySelector("#taskNameError")
const cashLabel = document.querySelector("#cashLabel")
const cashInput = document.querySelector("#cashInput")
const cashError = document.querySelector("#cashError")
const exchangeDisplay = document.querySelector("#exchange")
const sum = document.querySelector("#sum")
const exchange = 4.8282

exchangeDisplay.innerHTML = exchange

/* TWORZENIE TABELI */

let tasksData = [
  { id: "task1", taskName: "Zadanie 1", PLN: 2120 },
  { id: "task2", taskName: "Zadanie 2", PLN: 2121 },
  { id: "task3", taskName: "Zadanie 3", PLN: 2122 }
]

function loadTableData(tasksData) {
  const tableBody = document.getElementById('tableBody');
  let dataHtml = '';

  for (let task of tasksData) {
    dataHtml += `
  <tr class="tableRow" id="${task.id}">
    <td class="tableCell">${task.taskName}</td>
    <td class="tableCell">${task.PLN.toFixed(2)} PLN</td>
    <td class="tableCell">${(task.PLN / exchange).toFixed(2)} EUR</td>
    <td class="tableCell"><button class="delete" onclick="deleteTask(this.parentNode.parentNode.id)"><img src="./public/images/trash.png" class="trashImg">Usuń</button></td>
  </tr>`
  }

  tableBody.innerHTML = dataHtml
}

window.onload = () => {
  loadTableData(tasksData)
}

function sumCalc() {
  let sumPLN = tasksData.reduce((prev, cur) => prev + cur.PLN, 0);

  sum.innerText = `${sumPLN} PLN (${(sumPLN / exchange).toFixed(2)} Euro)`
}

sumCalc()

/* WALIDACJA NAZWY ZADANIA */

taskNameInput.addEventListener("keyup", () => {
  taskNameInput.value != "" ? taskNameLabel.style.visibility = "visible" : taskNameLabel.style.visibility = "hidden"
  taskNameInput.value == "" ? taskNameError.style.visibility = "visible" : taskNameError.style.visibility = "hidden"
})

taskNameInput.addEventListener("focusout", (e) => {
  taskNameInput.value == "" ? taskNameInput.classList.add("error") : taskNameInput.classList.remove("error")
  taskNameInput.value == "" ? taskNameError.style.visibility = "visible" : taskNameError.style.visibility = "hidden"
  taskNameInput.value.length < 5 ? taskNameInput.classList.add("error") : taskNameInput.classList.remove("error")
  taskNameInput.value.length < 5 ? taskNameError.style.visibility = "visible" : taskNameError.style.visibility = "hidden"
})

/* WALIDACJA KWOTY*/

cashInput.addEventListener("keyup", () => {
  cashInput.value != "" ? cashLabel.style.visibility = "visible" : cashLabel.style.visibility = "hidden"
  cashInput.value == "" ? cashError.style.visibility = "visible" : cashError.style.visibility = "hidden"
})

cashInput.addEventListener("focusout", (e) => {
  cashInput.value == "" ? cashInput.classList.add("error") : cashInput.classList.remove("error")
  cashInput.value == "" ? cashError.style.visibility = "visible" : cashError.style.visibility = "hidden"
})

/* SORTOWANIE TABELI */

function sortColumn(columnName, direction) {
  const dataType = typeof tasksData[0][columnName]
  const sortDirection = direction

  switch (dataType) {
    case 'string':
      sortStringColumn(sortDirection, columnName)
      break;
    case 'number':
      sortNumberColumn(sortDirection, columnName)
      break;
  }

  loadTableData(tasksData)
}

function sortStringColumn(sort, columnName) {
  tasksData = tasksData.sort((p1, p2) => {
    return sort ? ((p1[columnName] > p2[columnName]) ? 1 : -1) : ((p1[columnName] < p2[columnName]) ? 1 : -1)
  })
}

function sortNumberColumn(sort, columnName) {
  tasksData = tasksData.sort((p1, p2) => {
    return sort ? p1[columnName] - p2[columnName] : p2[columnName] - p1[columnName]
  })
}

/* OPERACJE NA TABELI */

function deleteTask(id) {
  const removeIndex = tasksData.findIndex(x => x.id === id)
  tasksData.splice(removeIndex, 1)

  loadTableData(tasksData)
  sumCalc()
}

function addTask() {
  if (taskNameInput.value.length > 4) {
    if (cashInput.value.length) {

      const newTask = {};
      newTask["id"] = "task" + (tasksData.length + 1)
      newTask["taskName"] = taskNameInput.value
      newTask["PLN"] = parseFloat(cashInput.value)
      tasksData.push(newTask)

      loadTableData(tasksData)
      sumCalc()

    } else {
      cashInput.classList.add("error")
      cashError.style.visibility = "visible"
    }
  } else {
    taskNameInput.classList.add("error")
    taskNameError.style.visibility = "visible"
    if (!cashInput.value.length) {
      cashInput.classList.add("error")
      cashError.style.visibility = "visible"
    }
  }
}
