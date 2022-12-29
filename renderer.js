const fs = require('fs')
var settings = require("./settings.json");


document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
    if (settings.theme === (null || 'Dark')) settings.theme = 'Light'
    else settings.theme = 'dark'
    var writestring = JSON.stringify(settings);
    fs.writeFileSync("./settings.json", writestring);
    const isDarkMode = await window.darkMode.toggle()
    document.getElementById('theme-source').innerHTML = isDarkMode ? settings.theme : system
})
  
document.getElementById('reset-to-system').addEventListener('click', async () => {
    await window.darkMode.system()
    document.getElementById('theme-source').innerHTML = 'System'
})




