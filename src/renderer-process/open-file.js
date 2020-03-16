import { ipcRenderer } from "electron";

import fs from "fs";

const selectJsonBtn = document.getElementById("open-json");
const jsonFileContainer = document.getElementById("json-file-container");

selectJsonBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-file-dialog");
})

ipcRenderer.on("selected-file", (event, path) => {
  initialize(jsonFileContainer);

  document.getElementById("open-json").innerHTML = `${path}`;
  document.getElementById("open-json").style.fontSize = "1vw";

  // Read file("*.json")
  let content = [];
  fs.readFile(path, (err, data) => {
    content.push(data);
  })

  // 빈 파일인 경우

  // 저장된 데이터가 있는 경우
});

/**
 * @param {*} element, 'video-files' document
 */
const initialize = (element) => {
  while(element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
