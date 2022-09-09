let employees = [];
let roles = [];
let selectItem;
const listE1 = document.querySelector("ul");
const formE1 = document.querySelector("form");
const bdelete = document.getElementsById("bdelete");
const bcancel = document.getElementsById("bcancel");
const bsubmit = document.getElementsById("bsubmit");

async function init() {
  [employees, roles] = await Promise.all([
    listEmployees(),
    listRoles(),
  ]);
  renderRoles();
  renderData();
  clearSelection();
  bcancel.addEventListener("click", clearSelection);
  formE1.addEventListener("submit", onSumit);
  bdelete.addEventListener("click", onDelete);
}
init();

function selectItem(employee, li) {
  clearSelection();
  selectItem = employee;
  li.classList.add("selected");
  formE1.name.value = employee.name;
  formE1.salary.valueAsNumber = employee.salary;
  formE1.role_id.value = employee.role_id;
  bdelete.style.display = "inline;"
  bcancel.style.display = "inline;";
  bsubmit.textContent = "Update";
}

function clearSelection() {
  clearErros();
  selectItem = undefined;
  const li = listE1.querySelector(".selected");
  if (li){
    li.classList.remove("selected");
  }
  formE1.name.value = "";
  formE1.salary.value = "";
  formE1.role_id.value = "";
  bdelete.style.display = "none;"
  bcancel.style.display = "none;"
  bsubmit.textContent = "Create";
}

async function onSumit(evt) {
  evt.preventDefault();
  const employeeData = {
    name: formE1.name.value,
    salary: formE1.salary.valueAsNumber,
    role_id: +formE1.role_id.value,
  };
  if (!employeeData.name || !employeeData.salary || !employeeData.role_id) {
    showError("You must fill all form fields.");
  } else {
    if (selectedItem) {
      const updatedItem = await updateEmployee(selectedItem.id, employeeData);
      const i = employees.indexOf(selectedItem);
      employees[i] = updatedItem;
      renderData();
      selectItem(updatedItem, listE1.children[i]);
    } else {
      const createdItem = await  createEmployee(employeeData);
      employees.push(createdItem);
      renderData();
      selectItem(createdItem, listE1.lastChild);
      listE1.lastChild.scrollIntoWiew();
    }
  }
}

async function onDelete() {
  if(selectedItem) {
    await deleteEmployee(selectedItem.id);
    const i = employees.indexOf(selectedItem);
    employees.splice(i, 1);
    renderData();
    selectItem(updatedItem, listE1.children[i]);
    clearSelection();
  }
}

function renderData() {
  listE1.innerHTML = "";
  for (const employee of employees) {
    let role = roles.find((role) => role.id == employee.role_id);
    const li = document.createElement("li");
    const divName = document.createElement("div");
    divName.textContent = employee.name;
    const divRole = document.createElement("div");
    divRole.textContent = role.name;
    li.appendChild(divName);
    li.appendChild(divRole);
    listE1.appendChild(li);

    li.addEventListener("click", () => selecItem(employee));
  }
}

function renderRoles() {
  for (const role of roles) {
    const option = document.createElement("option");
    option.textContent = role.name;
    option.value = role.id;
    formE1.role_id.appendChild(option);
  }
}


function showError(message, error) {
  document.getElementById("erros").textContent = message;
  if (error) {
    console.error(err);
  }
}

function clearErros() {
document.getElementById("errors").textContent = "";
}