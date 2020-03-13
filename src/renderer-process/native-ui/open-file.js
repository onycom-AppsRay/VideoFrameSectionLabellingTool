import { ipcRenderer } from "electron";
import fileExplorer from "../../helpers/file_explorer";

const selectDirBtn = document.getElementById('open-directory');

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-directory-dialog')
})

ipcRenderer.on('selected-directory', (event, path) => {
  document.getElementById('open-directory').innerHTML = `${path}`
  document.getElementById('open-directory').style.fontSize = '1vw';

  const result = fileExplorer.getFileList(`${path}`);

  result.forEach((value, index) => {
    const span = document.createElement("span");
    const br = document.createElement("br");
    document.getElementById('video-files').appendChild(span).innerHTML = `${index}.${value.name}`;
    span.appendChild(br);
  })

  console.log(result);
})
