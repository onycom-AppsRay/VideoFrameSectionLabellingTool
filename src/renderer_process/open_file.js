import { ipcRenderer } from "electron";

import jsonFileContainer from "../section/json/jsonFileContainer";

import globalJSONFile from "../model/global/globalJSONFile";

import validation from "../helpers/validation";
import jsonControl from "../helpers/json_control";

const selectJsonBtn = document.getElementById("open-json");

selectJsonBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-file-dialog");
})

ipcRenderer.on("selected-file", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = getFileName(path);

  jsonFileContainer.initialize();

  const json = jsonControl.getJSONFile(path);

  if (validation.checkJSONValueType(json)) {
    alert("This is a valid JSON file.");

    const GlobalJSONFile = new globalJSONFile();
    GlobalJSONFile.setPATH(path);
    GlobalJSONFile.setNAME(fileName);

    jsonFileContainer.showVideoFiles(json);
  } else {
    alert("Invalid JSON file.");
    return;
  }
})

const getFileName = (path) => {
  const pathElement = path.split("/");

  return pathElement[pathElement.length - 1];
}
