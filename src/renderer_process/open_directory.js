import { ipcRenderer } from "electron";

import fileExplorer from "../helpers/file_explorer";
import videoControl from "../helpers/video_control";
import tagControl from "../helpers/tag_control";
import jsonControl from "../helpers/json_control";

const selectDirBtn = document.getElementById("open-directory");

const videoFilesContainer = document.getElementById("video-files-container");
const jsonFileContainer = document.getElementById("json-file-container");

selectDirBtn.addEventListener("click", (event) => {
  ipcRenderer.send('open-directory-dialog');
});

ipcRenderer.on("selected-directory", (event, pathArr) => {
  const path = pathArr[0];

  tagControl.initialize(videoFilesContainer);

  showDirPath(path);

  const fileList = fileExplorer.getFileList(path);

  showFileList(fileList);

  jsonControl.markingDirectoryVideoFile(videoFilesContainer, jsonFileContainer);
});

const showDirPath = (path) => {
  selectDirBtn.innerHTML = path;
}

// TODO(yhpakr): 'Show file list' 코드 합치기
const showFileList = (fileList) => {
  fileList.forEach((fileInfo, index) => {
    const filePath = fileInfo.path;
    const fileTitle = fileInfo.name;

    const videoTitleTag = videoControl.createSpanTagForVideo(filePath, fileTitle, index);

    videoFilesContainer.appendChild(videoTitleTag);
    videoFilesContainer.appendChild(document.createElement("br"));
  })
}
