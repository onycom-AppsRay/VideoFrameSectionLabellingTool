import { ipcRenderer } from "electron";
import fs from "fs";

import globalJSONFile from "../model/globalJSONFile";
import jsonFile from "../model/jsonFile";

import tagControl from "../helpers/tag_control";
import validation from "../helpers/validation";
import jsonControl from "../helpers/json_control";

import openDirectory from "../renderer_process/open_directory";

const selectJsonBtn = document.getElementById("open-json");
const jsonFileContainer = document.getElementById("json-file-container");
const videoFilesContainer = document.getElementById("video-files-container");

const JSONFileVideoDataCount = document.getElementById("json-file-video-data-count");

selectJsonBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-file-dialog");
})

ipcRenderer.on("selected-file", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = getFileName(path);

  tagControl.initialize(jsonFileContainer);

  selectJsonBtn.innerHTML = `${fileName}`;

  const openJSONFileContent = readJSONFile(path);
  const JSONFile = new jsonFile(openJSONFileContent);

  if (validation.validationValue(openJSONFileContent)) {
    alert("유효한 JSON 파일 입니다.");

    const GlobalJSONFile = new globalJSONFile();
    GlobalJSONFile.setPATH(path);
    GlobalJSONFile.setNAME(fileName);

    showFileList(JSONFile.videos);

    showJSONFileVideoDataCount(JSONFile.videos.length);

    markingDirectoryVideoFile(videoFilesContainer, jsonFileContainer);
  } else {
    alert("유효하지 않은 JSON 파일 입니다.");
    return;
  }
})

const markingDirectoryVideoFile = (videoFilesContainer, jsonFileContainer) => {
  if (!videoFilesContainer.hasChildNodes() || !jsonFileContainer.hasChildNodes()) {
    return;
  }

  const dirVideoTitleList = tagControl.getTitlesOfVideoTags(videoFilesContainer);
  const jsonVideoTitleList = tagControl.getTitlesOfVideoTags(jsonFileContainer);

  const matchedVideoList = jsonControl.matchingVideoTitle(dirVideoTitleList, jsonVideoTitleList);

  matchedVideoList.forEach((videoTitle) => {
    openDirectory.markingVideoTitle(videoTitle);
  })

  openDirectory.showCompletedVideoCount(matchedVideoList.length);
}

const showJSONFileVideoDataCount = (count) => {
  JSONFileVideoDataCount.innerHTML = count;
}

const getJSONFileVideoDataCount = () => {
  return Number.parseInt(JSONFileVideoDataCount.innerHTML);
}

const showFileList = (videos) => {
  videos.forEach((video) => {
    const videoTitle = video.title.replace(/\ |-|#|&/gi, "");

    const videoTitleTag = tagControl.createNameTag("span","completed-video-title", videoTitle, "", videoTitle, videoTitle);

    jsonFileContainer.appendChild(videoTitleTag);
    jsonFileContainer.appendChild(document.createElement("br"));
  })
}

const readJSONFile = (path) => {
  return JSON.parse(fs.readFileSync(path));
}

const getFileName = (path) => {
  const pathElement = path.split("/");

  return pathElement[pathElement.length - 1];
}

const addFileTitleTag = (videoTitle) => {
  const title = videoTitle.replace(/\ |-|#|&/gi, "");
  const videoTitleTag = tagControl.createNameTag("span","completed-video-title", title, "", title, title);

  jsonFileContainer.appendChild(videoTitleTag);
  jsonFileContainer.appendChild(document.createElement("br"));
}

export default {
  addFileTitleTag,
  showJSONFileVideoDataCount,
  getJSONFileVideoDataCount,
}
