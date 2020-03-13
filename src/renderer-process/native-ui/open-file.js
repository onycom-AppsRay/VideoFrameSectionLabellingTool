import {ipcRenderer} from "electron";

const selectDirBtn = document.getElementById('open-directory');

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-directory-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
  document.getElementById('open-directory').innerHTML = `${path}`
  document.getElementById('open-directory').style.fontSize = '1vw';
})
