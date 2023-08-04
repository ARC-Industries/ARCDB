const { ipcRenderer } = require("electron");

const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const responsibleGroup = document.querySelector("#responsibleGroup")
const taskList = document.querySelector("#taskList");
const greetingThing = document.getElementById("greetingThing");

let updateStatus = false;
let idTaskToUpdate = "";

function deleteTask(id) {
  const response = confirm("are you sure you want to delete it?");
  if (response) {
    ipcRenderer.send("delete-task", id);
  }
  return;
}

function editTask(id) {
  updateStatus = true;
  idTaskToUpdate = id;
  const task = tasks.find((task) => task._id === id);
  taskName.value = task.name;
  taskDescription.value = task.description;
  responsibleGroup.value = task.responsibleGroup;
}

function renderTasks(tasks) {
  taskList.innerHTML = "";
  tasks.map((t) => {
    taskList.innerHTML += `
          <li class="card">
            <h4>
              Task id: ${t._id}
            </h4>
            <p>
              Task Name: ${t.name}
            </p>
            <p>
              Responsible group: ${t.responsibleGroup}
            </p>
            <p>
              Task Description: ${t.description}
            </p>
            <p>
              Date Created: ${t.creationDate}
            </p>
            <button class="btn btn-danger" onclick="deleteTask('${t._id}')">
              🗑 Delete
            </button>
            <button class="btn btn-secondary" onclick="editTask('${t._id}')">
              ✎ Edit
            </button>
          </li>
        `;
  });
}

function renderGreeting(greeting) {
  // alert(greeting.rank)
  greetingThing.innerHTML = "Greetings, a";
}

let tasks = [];

ipcRenderer.send("get-tasks");
ipcRenderer.send("get-rank")

taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const task = {
    name: taskName.value,
    description: taskDescription.value,
    responsibleGroup: responsibleGroup.value,
  };

  if (!updateStatus) {
    ipcRenderer.send("new-task", task);
  } else {
    ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
  }

  taskForm.reset();
});

ipcRenderer.on("got-rank", (e, arg) => {
  // alert("something")
  // const receivedData = JSON.parse(arg);
})
renderGreeting("")

ipcRenderer.on("new-task-created", (e, arg) => {
  console.log(arg);
  const taskSaved = JSON.parse(arg);
  tasks.push(taskSaved);

  // this will log the updated data
  console.log(tasks);

  renderTasks(tasks);
  alert("Task Created Successfully");
  taskName.focus();
});

ipcRenderer.on("get-tasks", (e, args) => {
  const receivedTasks = JSON.parse(args);
  tasks = receivedTasks;
  renderTasks(tasks);
});

ipcRenderer.on("delete-task-success", (e, args) => {
  const deletedTask = JSON.parse(args);
  const newTasks = tasks.filter((t) => {
    return t._id !== deletedTask._id;
  });
  tasks = newTasks;
  renderTasks(tasks);
});

ipcRenderer.on("update-task-success", (e, args) => {
  updateStatus = false;
  const updatedTask = JSON.parse(args);
  tasks = tasks.map((t, i) => {
    if (t._id === updatedTask._id) {
      t.name = updatedTask.name;
      t.description = updatedTask.description;
      t.responsibleGroup = updatedTask.responsibleGroup;
    }
    return t;
  });
  renderTasks(tasks);
});
