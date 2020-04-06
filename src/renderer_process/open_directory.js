import { ipcRenderer, remote } from "electron";

import videoFilesContainer from "../section/video/videoFilesContainer";

import fileExplorer from "../helpers/file_explorer";

import globalJSONFile from "../model/global/globalJSONFile";

const SELECT_DIR_BTN = document.getElementById("open-directory");
const JSON_PATH = new globalJSONFile().PATH;

SELECT_DIR_BTN.addEventListener("click", (event) => {
  ipcRenderer.send('open-directory-dialog');

  SELECT_DIR_BTN.className = "btn btn-outline-primary";
});

ipcRenderer.on("selected-directory", (event, pathArr) => {
  const directoryPath = pathArr[0];

  remote.getGlobal("sharedObject").DIRECTORY.PATH = directoryPath;

  videoFilesContainer.initialize();

  const completedVideoFiles = videoFilesContainer.checkCompletedVideoFiles(directoryPath, JSON_PATH);
  const videoFiles = fileExplorer.getFileList(directoryPath);

  videoFilesContainer.showVideoFiles(videoFiles, completedVideoFiles);

  SELECT_DIR_BTN.className = "btn btn-primary";
});
