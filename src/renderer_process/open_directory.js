import { ipcRenderer } from "electron";

import fileExplorer from "../helpers/file_explorer";
import tagControl from "../helpers/tag_control";
import jsonControl from "../helpers/json_control";

const selectDirBtn = document.getElementById("open-directory");

const videoFilesContainer = document.getElementById("video-files-container");
const jsonFileContainer = document.getElementById("json-file-container");

const completedVideoCount = document.getElementById("completed-video-count");

selectDirBtn.addEventListener("click", (event) => {
  ipcRenderer.send('open-directory-dialog');

  selectDirBtn.className = "btn btn-outline-primary";
});

ipcRenderer.on("selected-directory", (event, pathArr) => {
  const path = pathArr[0];

  tagControl.initialize(videoFilesContainer);

  const fileList = fileExplorer.getFileList(path);

  showTotalVideoCount(fileList.length);

  showFileList(fileList);

  markingDirectoryVideoFile(videoFilesContainer, jsonFileContainer);

  selectDirBtn.className = "btn btn-primary";
});

const markingDirectoryVideoFile = (videoFilesContainer, jsonFileContainer) => {
  if (!videoFilesContainer.hasChildNodes() || !jsonFileContainer.hasChildNodes()) {
    return;
  }

  const dirVideoTitleList = tagControl.getTitlesOfVideoTags(videoFilesContainer);
  const jsonVideoTitleList = tagControl.getTitlesOfVideoTags(jsonFileContainer);

  const matchedVideoList = jsonControl.matchingVideoTitle(dirVideoTitleList, jsonVideoTitleList);

  showCompletedVideoCount(matchedVideoList.length);

  matchedVideoList.forEach((videoTitle) => {
    markingVideoTitle(videoTitle);
  })
}

const markingVideoTitle = (videoTitle) => {
  document.getElementById(videoTitle).style.textDecoration = "line-through";
};

const showTotalVideoCount = (count) => {
  document.getElementById("total-video-count").innerHTML = count;
}

const showCompletedVideoCount = (count) => {
  completedVideoCount.innerHTML = count;
}

const getCompletedVideoCount = () => {
  return Number.parseInt(completedVideoCount.innerHTML);
}

const showFileList = (fileList) => {
  fileList.forEach((fileInfo) => {
    const filePath = fileInfo.path;
    const fileTitle = fileInfo.name.replace(/\ |-|#|&/gi, "");

    const span = document.createElement("span");
    span.className = "video-file";
    span.id = fileTitle;
    span.dataset.path = filePath;
    span.dataset.title = fileTitle;
    span.innerText = fileTitle;
    span.style.wordBreak = "keep-all";

    videoFilesContainer.appendChild(span);
    videoFilesContainer.appendChild(document.createElement("br"));
  })
}

export default {
  markingVideoTitle,
  showCompletedVideoCount,
  getCompletedVideoCount
}
