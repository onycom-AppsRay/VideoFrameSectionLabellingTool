import { ipcRenderer, remote } from "electron";
import path from "path";

import jsonControl from "../../../helpers/json/json_control";

import JSONFileDTO from "../../../model/dto/JSONFile2";

const createFileBtn = document.getElementById("create-file-button");
const goCriteriaPageBtn = document.querySelector(`#open-file-page-container button[name="go-criteria"]`);

const openFilePage = document.getElementById("open-file-page");

createFileBtn.onclick = () => {
  ipcRenderer.send("open-json-directory-dialog");
}

ipcRenderer.on("selected-json-directory", (event, pathArr) => {
  const fileName = jsonControl.createFileNameWithCurrentTime();
  const storedPath = pathArr[0];
  const fullPath = path.join(storedPath, fileName);

  // Create JSON file
  const JSONFile = new JSONFileDTO()
    .setName(fileName)
    .setPath(storedPath)
  
  jsonControl.writeJSONFile(fullPath, JSONFile);

  // Set GLOBAL Variable
  remote.getGlobal("sharedObject").JSON_FILE.NAME = fileName;
  remote.getGlobal("sharedObject").JSON_FILE.PATH = fullPath;

  // Show Sub View
  document.querySelector("#open-file-path > p").innerText = fullPath;
  document.querySelector("#json-file-path").innerText = fullPath;

  // Display Button
  goCriteriaPageBtn.hidden = "";
  document.querySelector("#go-labelling").hidden = true;

  return true;
});

goCriteriaPageBtn.onclick = () => {
  openFilePage.style.display = "none";

  document.querySelector("#open-file-path > p").innerHTML = `.&nbsp;.&nbsp.`;

  goCriteriaPageBtn.hidden = true;
  document.querySelector("#go-labelling").hidden = true;
}
