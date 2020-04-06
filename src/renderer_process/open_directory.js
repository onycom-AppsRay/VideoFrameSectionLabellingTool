import { ipcRenderer, remote } from "electron";

import videoFilesContainer from "../section/video/videoFilesContainer";

import fileExplorer from "../helpers/file_explorer";

const selectDirBtn = document.getElementById("open-directory");

const JSON_PATH = remote.getGlobal("sharedObject").JSON_FILE.PATH;
const DIRECTORY_PATH = remote.getGlobal("sharedObject").DIRECTORY.PATH;

selectDirBtn.addEventListener("click", (event) => {
  ipcRenderer.send('open-directory-dialog');

  selectDirBtn.className = "btn btn-outline-primary";
});

ipcRenderer.on("selected-directory", (event, pathArr) => {
  const path = pathArr[0];

  remote.getGlobal("sharedObject").DIRECTORY.PATH = path;

  videoFilesContainer.initialize();

  const completedVideoFiles = videoFilesContainer.checkCompletedVideoFiles(DIRECTORY_PATH, JSON_PATH);
  const files = fileExplorer.getFileList(path);

  videoFilesContainer.showVideoFiles(files, completedVideoFiles);

  selectDirBtn.className = "btn btn-primary";
});
