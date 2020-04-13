import { ipcRenderer, remote } from "electron";

import jsonControl from "../../helpers/json_control";

import jsonFile from "../../model/jsonFile";

const createFileBtn = document.getElementById("create-file-button");
const goFormCriteriaPageBtn = document.getElementById("go-form-criteria-page-btn");
const openFilePage = document.getElementById("open-file-page");

let pageMoveFlag = false;

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

  // set global
  remote.getGlobal("sharedObject").JSON_FILE.PATH = path;
  remote.getGlobal("sharedObject").JSON_FILE.NAME = fileName;

  const JSONFile = new jsonFile().setName(fileName).setCreateAt();

  const creationPath = String.prototype.concat(path, "/", fileName);

  jsonControl.writeJSONFile(creationPath, JSONFile);

  document.querySelector("#open-file-path > p").innerText = creationPath;

  pageMoveFlag = true;
});

goFormCriteriaPageBtn.onclick = () => {
  if(pageMoveFlag) {
    openFilePage.style.display = "none";

    return;
  } else {
    alert("파일을 가져오세요.");

    return;
  }
}
