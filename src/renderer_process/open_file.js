import { ipcRenderer, remote } from "electron";

import jsonFileContainer from "../section/json/jsonFileContainer";
import videoFilesContainer from "../section/video/videoFilesContainer";

import globalJSONFile from "../model/global/globalJSONFile";

import validation from "../helpers/validation";
import jsonControl from "../helpers/json_control";

const selectJsonBtn = document.getElementById("open-json");

selectJsonBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-file-dialog");

  document.getElementById("open-json").className = "btn btn-outline-primary";
})

ipcRenderer.on("selected-file", (event, pathArr) => {
  const jsonPath = pathArr[0];
  const fileName = getFileName(jsonPath);

  jsonFileContainer.initialize();

  const json = jsonControl.getJSONFile(jsonPath);

  if(json == false) {
    alert("Not JSON");
    return;
  }

  if (validation.checkJSONValueType(json)) {
    alert("This is a valid JSON file.");

    const GlobalJSONFile = new globalJSONFile();
    GlobalJSONFile.setPATH(jsonPath);
    GlobalJSONFile.setNAME(fileName);

    const DIRECTORY_PATH = remote.getGlobal("sharedObject").DIRECTORY.PATH;

    const completedVideoFiles = videoFilesContainer.checkCompletedVideoFiles(DIRECTORY_PATH, jsonPath);

    if(completedVideoFiles.length > 0) {
      videoFilesContainer.markCompletedVideoFiles(completedVideoFiles);
    }

    jsonFileContainer.showVideoFiles(json);

    // TODO(yhpark): Read 'criteria'

    document.getElementById("open-json").className = "btn btn-primary";

    return;
  } else {
    alert("Invalid JSON file.");
    return;
  }
})

const getFileName = (path) => {
  const pathElement = path.split("/");

  return pathElement[pathElement.length - 1];
}
