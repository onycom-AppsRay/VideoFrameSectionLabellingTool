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

  showDirectoryName(path);

  const fileList = fileExplorer.getFileList(path);

  showFileList(fileList);

  jsonControl.markingDirectoryVideoFile(videoFilesContainer, jsonFileContainer);
});

const showDirectoryName = (path) => {
  const pathList = path.split("/");

  selectDirBtn.innerHTML = pathList[pathList.length - 1];;
}

const showFileList = (fileList) => {
  fileList.forEach((fileInfo) => {
    const filePath = fileInfo.path;
    const fileTitle = fileInfo.name;

    const videoTitleTag = tagControl.createNameTag("span", "video-file", "", filePath, fileTitle, fileTitle);

    tagControl.addEvent(videoTitleTag, "click", videoControl.clickedVideoTitleTag, false);

    videoFilesContainer.appendChild(videoTitleTag);
    videoFilesContainer.appendChild(document.createElement("br"));
  })
}
