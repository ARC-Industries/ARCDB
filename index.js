const electron = require('electron');
const proc = require('child_process');

console.log(electron);

const child = proc.spawn(electron);