const { ipcRenderer } = require("electron");

const greetingThing = document.getElementById("greetingThing");

function renderGreeting(greeting) {
  // alert(greeting.rank)
  greetingThing.innerHTML = `Greetings, ${greeting.rank}`;
}

ipcRenderer.send("get-rank")

ipcRenderer.on("got-rank", (e, arg) => {
  const receivedData = JSON.parse(arg);
  renderGreeting(receivedData)  
})

