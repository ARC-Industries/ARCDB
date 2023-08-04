const { BrowserWindow, ipcMain } = require("electron");
const Task = require("./models/Task");
const Employee = require("./models/Employee");
const { isLoggedIn, handleLogin, loginData } = require("./loginHandler");

function createWindow() {
  win = new BrowserWindow({
    width: 700,
    height: 500,
    icon: 'resources/icon.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
  });

  win.loadFile("app/login.html");
}

// regular DB tasks
ipcMain.on("new-task", async (e, arg) => {
  const newTask = new Task(arg);
  const taskSaved = await newTask.save();
  e.reply("new-task-created", JSON.stringify(taskSaved));
});

ipcMain.on("get-tasks", async (e, arg) => {
  const tasks = await Task.find();
  e.reply("get-tasks", JSON.stringify(tasks));
});

ipcMain.on("delete-task", async (e, args) => {
  const taskDeleted = await Task.findByIdAndDelete(args);
  e.reply("delete-task-success", JSON.stringify(taskDeleted));
});

ipcMain.on("update-task", async (e, args) => {
  console.log(args);
  const updatedTask = await Task.findByIdAndUpdate(
    args.idTaskToUpdate,
    { name: args.name, description: args.description, responsibleGroup: args.responsibleGroup },
    { new: true }
  );
  e.reply("update-task-success", JSON.stringify(updatedTask));
});

// employee DB tasks
ipcMain.on("get-rank", async (e, arg) => {
  const rank = await Employee.findOne({ username: loginData.uname });
  e.reply("got-rank", JSON.stringify(rank));
});

ipcMain.on("new-employee", async (e, arg) => {
  const newEmployee = new Employee(arg);
  const employeeSaved = await newEmployee.save();

  e.reply("new-employee-created", JSON.stringify(employeeSaved));
});

ipcMain.on("get-employees", async (e, arg) => {
  const employees = await Employee.find();
  e.reply("got-employees", JSON.stringify(employees));
});

ipcMain.on("delete-employee", async (e, args) => {
  const employeeDeleted = await Employee.findByIdAndDelete(args);
  e.reply("delete-employee-success", JSON.stringify(employeeDeleted));
});

ipcMain.on("update-employee", async (e, args) => {
  console.log(args);
  const updatedEmployee = await Employee.findByIdAndUpdate(
    args.idEmployeeToUpdate,
    { name: args.name, surname: args.surname, group: args.group, employer: args.employer },
    { new: true }
  );
  e.reply("update-employee-success", JSON.stringify(updatedEmployee));
});


ipcMain.on("logged-in-request", async (e, args) => {
  var loggedIn =  await isLoggedIn()
  if (loggedIn) {
    // for verbosity's sake
    // console.log(loggedIn, "\nwas true")

    // tells the frontend that we are logged in
    win.loadFile("app/index.html")
  } else {
    // tells the frontend that we are not logged in
    e.reply("not-logged")

    // verbosity's sake
    // console.log(loggedIn, "\nwas false")
  }
})

ipcMain.on("login-data", async (e, arg) => {
  var handled = await handleLogin(arg);
  if (!handled) {
    console.log(handled)
    e.reply("login-failed");
  } else {
    console.log(handled, "\nlogged in ")
    win.loadFile("app/index.html")
    e.reply("logged-in")
  }
})

module.exports = { createWindow };
