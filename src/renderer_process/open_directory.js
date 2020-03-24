import { ipcRenderer } from "electron";

import fileExplorer from "../helpers/file_explorer.js";
import videoControl from "../helpers/video_control.js";
import tagControl from "../helpers/tag_control.js";

const selectDirBtn = document.getElementById("open-directory");
const videoTitleContainer = document.getElementById("video-files-container");

selectDirBtn.addEventListener("click", (event) => {
  ipcRenderer.send('open-directory-dialog');
});

ipcRenderer.on("selected-directory", (event, pathArr) => {
  const path = pathArr[0];

  tagControl.initialize(videoTitleContainer);

  showDirPath(path);

  const fileList = fileExplorer.getFileList(path);

  showFileList(fileList);
});

const showDirPath = (path) => {
  selectDirBtn.innerHTML = path;
}

const showFileList = (fileList) => {
  fileList.forEach((fileInfo, index) => {
    const filePath = fileInfo.path;
    const fileTitle = fileInfo.name;

    const videoTitleTag = videoControl.createSpanTagForVideo(filePath, fileTitle, index);

    videoTitleContainer.appendChild(videoTitleTag);
    videoTitleContainer.appendChild(document.createElement("br"));
  })
}
