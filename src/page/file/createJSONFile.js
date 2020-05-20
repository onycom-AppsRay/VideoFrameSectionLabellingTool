import { ipcRenderer, remote } from "electron";

import jsonControl from "../../helpers/json/json_control";

import jsonFileDTO from "../../model/dto/jsonFile";

const createFileBtn = document.getElementById("create-file-button");
const goCriteriaPageBtn = document.querySelector(`#open-file-page-container button[name="go-criteria"]`);

const openFilePage = document.getElementById("open-file-page");

createFileBtn.onclick = () => {
  ipcRenderer.send("open-json-directory-dialog");
}

ipcRenderer.on("selected-json-directory", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = jsonControl.createFileNameWithCurrentTime();

  if (!jsonControl.hasJSONFile(path, fileName)) {
    alert(`There is a file with the same name as the one you want to create. \n\n '${fileName}'`);

    return;
  }

  const JSONFile = new jsonFileDTO().setName(fileName);

  const creationPath = String.prototype.concat(path, "/", fileName);

  // set global
  remote.getGlobal("sharedObject").JSON_FILE.NAME = fileName;
  remote.getGlobal("sharedObject").JSON_FILE.PATH = creationPath;

  jsonControl.writeJSONFile(creationPath, JSONFile);

  document.querySelector("#open-file-path > p").innerText = creationPath;
  document.getElementById("json-file-path").innerText = creationPath;

  goCriteriaPageBtn.hidden = "";
  document.getElementById("go-labbeling").hidden = true;
});

goCriteriaPageBtn.onclick = () => {
  openFilePage.style.display = "none";

  document.querySelector("#open-file-path > p").innerHTML = `.&nbsp;.&nbsp.`;

  goCriteriaPageBtn.hidden = true;
  document.getElementById("go-labbeling").hidden = true;
}
