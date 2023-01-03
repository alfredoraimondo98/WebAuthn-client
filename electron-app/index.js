const {ipcRenderer} = require('electron');

ipcRenderer.on('open-window-response', (event, arg) => {
    // prints "pong" in the JS console (chromium)
    console.log(arg);
});

var button = document.createElement('button');

button.textContent = 'Open';

button.addEventListener('click',() => {
    let obj = {
        pass : 'ok',
        ser : 1000
    }
    ipcRenderer.send('open-window', obj);

}, false);  

document.body.appendChild(button)