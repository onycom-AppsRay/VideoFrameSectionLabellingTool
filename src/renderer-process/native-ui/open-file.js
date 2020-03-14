import { ipcRenderer } from "electron";
import fileExplorer from "../../helpers/file_explorer";

const selectDirBtn = document.getElementById('open-directory');

selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-directory-dialog')
});

ipcRenderer.on('selected-directory', (event, path) => {
  const videoFliesContainer = document.getElementById('video-files');

  initialize(videoFliesContainer);

  document.getElementById('open-directory').innerHTML = `${path}`
  document.getElementById('open-directory').style.fontSize = '1vw';

  const result = fileExplorer.getFileList(`${path}`);

  result.forEach((value, index) => {
    const span = document.createElement("span");
    span.setAttribute('id', 'video-file');

    const br = document.createElement("br");

    videoFliesContainer.appendChild(span).innerHTML = `${index}.&nbsp;${value.name}`;

    span.appendChild(br);
  });
});

/**
 * @param {*} element, 'video-files' document
 */
const initialize = (element) => {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
