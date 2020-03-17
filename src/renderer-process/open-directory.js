import { ipcRenderer } from "electron";
import fileExplorer from "../helpers/file_explorer";
import VideoControl from "../helpers/video-control";

const selectDirBtn = document.getElementById("open-directory");
const videoFliesContainer = document.getElementById("video-files-container");

// Video Directory
selectDirBtn.addEventListener('click', (event) => {
  ipcRenderer.send('open-directory-dialog');
});

ipcRenderer.on('selected-directory', (event, path) => {
  initialize(videoFliesContainer);

  document.getElementById('open-directory').innerHTML = `${path}`;
  document.getElementById('open-directory').style.fontSize = "1vw";

  const result = fileExplorer.getFileList(`${path}`);

  result.forEach((value, index) => {
    const span = document.createElement("span");
    span.setAttribute('class', 'video-file');
    span.setAttribute('data-info', JSON.stringify(value, null, 2));
    span.addEventListener('click', (event) => {
      VideoControl.clickVideoFile(event.target, 5);
    }, false);

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
