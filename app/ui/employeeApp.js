const { ipcRenderer } = require("electron");

const employeeForm = document.querySelector("#employeeForm");
const employeeName = document.querySelector("#employeeName");
const employeeSurname = document.querySelector("#employeeSurname");
const employeeGroup = document.querySelector("#employeeGroup")
const employeeList = document.querySelector("#employeeList");
const employeeEmployer = document.querySelector('#employeeEmployer');
const employeeRank = document.querySelector('#employeeRank');
const employeeUsername = document.querySelector('#employeeUsername');

let updateStatus = false;
let idEmployeeToUpdate = "";

function deleteEmployee(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-employee", id);
  }
  return;
}

function editEmployee(id) {
  updateStatus = true;
  idEmployeeToUpdate = id;
  const employee = employees.find((employee) => employee._id === id);
  employeeName.value = employee.name;
  employeeSurname.value = employee.surname;
  employeeGroup.value = employee.group;
  employeeEmployer.value = employee.employer;
  employeeRank.value = employee.rank;
  employeeUsername.value = employee.username;
}

function renderEmployees(employees) {
  employeeList.innerHTML = "";
  employees.map((t) => {
    employeeList.innerHTML += `
          <li class="card">
            <h4>
              Employee id: ${t._id}
            </h4>
            <p>
              Employee Name: ${t.name}
            </p>
            <p>
              Group: ${t.group}
            </p>
            <p>
              Rank: ${t.rank}
            </p>
            <p>
              Employer: ${t.employer}
            </p>
            <p>
              Date Employed: ${t.dateEmployed}
            </p>
            <button class="btn btn-danger" onclick="deleteEmployee('${t._id}')">
              🗑 Delete
            </button>
            <button class="btn btn-secondary" onclick="editEmployee('${t._id}')">
              ✎ Edit
            </button>
          </li>
        `;
  });
}

let employees = [];

ipcRenderer.send("get-employees");

employeeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const employee = {
    name: employeeName.value,
    surname: employeeSurname.value,
    group: employeeGroup.value,
    employer: employeeEmployer.value,
    username: employeeUsername.value,
    rank: employeeRank.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-employee", employee);
  } else {
    ipcRenderer.send("update-employee", { ...employee, idEmployeeToUpdate });
  }

  employeeForm.reset();
});

ipcRenderer.on("new-employee-created", (e, arg) => {
  console.log(arg);
  const employeeSaved = JSON.parse(arg);
  employees.push(employeeSaved);

  // this will log the updated data
  console.log(employees);

  renderEmployees(employees);
  alert("Employee Created Successfully");
  employeeName.focus();
});

ipcRenderer.on("got-employees", (e, args) => {
  const receivedEmployees = JSON.parse(args);
  employees = receivedEmployees;
  renderEmployees(employees);
});

ipcRenderer.on("delete-employee-success", (e, args) => {
  const deletedEmployee = JSON.parse(args);
  const newEmployees = employees.filter((t) => {
    return t._id !== deletedEmployee._id;
  });
  employees = newEmployees;
  renderEmployees(employees);
});

ipcRenderer.on("update-employee-success", (e, args) => {
  updateStatus = false;
  const updatedEmployee = JSON.parse(args);
  employees = employees.map((t, i) => {
    if (t._id === updatedEmployee._id) {
      t.name = updatedEmployee.name;
      t.surname = updatedEmployee.surname;
      t.group = updatedEmployee.group;
      t.employer = updatedEmployee.employer;
      t.username = updatedEmployee.username;
      t.rank = updatedEmployee.rank;

    }
    return t;
  });
  renderEmployees(employees);
});
