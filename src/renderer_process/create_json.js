import { ipcRenderer } from "electron";

import jsonControl from "../helpers/json_control";

import globalJSONFile from "../model/global/globalJSONFile";

import jsonFile from "../model/jsonFile";

const selectedCreateJson = document.getElementById("create-json");

selectedCreateJson.addEventListener("click", (event) => {
  ipcRenderer.send("open-json-directory-dialog");

  document.getElementById("create-json").className = "btn btn-outline-primary";
});

ipcRenderer.on("selected-json-directory", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = jsonControl.createFileNameWithCurrentTime();

  if (!jsonControl.hasJSONFile(path, fileName)) {
    alert(`There is a file with the same name as the one you want to create. \n\n '${fileName}'`);

    return;
  }

  const GlobalJSONFile = new globalJSONFile();
  GlobalJSONFile.setPATH(path);
  GlobalJSONFile.setNAME(fileName);

  const json = new jsonFile().makeJSON().setName(fileName);
  const creationPath = String.prototype.concat(path, "/", fileName);

  jsonControl.writeJSONFile(creationPath, json);

  document.getElementById("create-json").className = "btn btn-primary";
});
