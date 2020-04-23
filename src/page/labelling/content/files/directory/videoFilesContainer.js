import tagControl from "../../../../../helpers/tag_control";
import jsonControl from "../../../../../helpers/json_control";
import fileExplorer from "../../../../../helpers/file_explorer";

import jsonFileDTO from "../../../../../model/dto/jsonFile";

const initialize = () => {
  const videoFilesContainer = document.getElementById("video-files-container");
  tagControl.initialize(videoFilesContainer);
}

const showVideoFiles = (videoFiles, completedVideoFiles = []) => {
  const videoFilesContainer = document.getElementById("video-files-container");

  Array.prototype.forEach.call(videoFiles, (fileInfo) => {
    const span = document.createElement("span");

    span.className = "video-file";
    span.id = fileInfo.name;
    span.dataset.path = fileInfo.path;
    span.dataset.title = fileInfo.name;
    span.innerText = fileInfo.name.replace(/\ |-|#|&/gi, "");
    span.style.wordBreak = "keep-all";

    videoFilesContainer.appendChild(span);
    videoFilesContainer.appendChild(document.createElement("br"));
  })

  showDirectoryVideoFilesCount(videoFiles);
  markCompletedVideoFiles(completedVideoFiles);
}

const checkCompletedVideoFiles = (directoryPath, jsonFilePath) => {
  let result = [];

  if(directoryPath && jsonFilePath) {
    const videoFiles = fileExplorer.getFileList(directoryPath);
    const completedVideoFiles = jsonControl.getJSONFile(jsonFilePath).videos;

    videoFiles.forEach((video) => {
      completedVideoFiles.forEach((completedVideoFile) => {
        if(video.name == completedVideoFile.title) {
          result.push(video.name);
        }
      })
    })

    showCompletedVideoFilesCount(result);
  }

  return result;
}

const markCompletedVideoFiles = (completedVideoFiles) => {
  const videoFiles = document.getElementsByClassName("video-file");

  for(let i = 0; i < completedVideoFiles.length; i++) {
    let completedVideoFileTitle = completedVideoFiles[i];

    for(let j = 0; j < videoFiles.length; j++) {
      let videoFileTitle = videoFiles[j].id;

      if(completedVideoFileTitle == videoFileTitle) {
        videoFiles[j].style.textDecoration = "line-through";
      }
    }
  }
}

const showCompletedVideoFilesCount = (completedVideoFiles) => {
  document.getElementById("completed-video-count").innerHTML = completedVideoFiles.length;
}

const showDirectoryVideoFilesCount = (fileList) => {
  document.getElementById("total-video-count").innerHTML = fileList.length;
}

const searchNextVideo = (nowVideoTitle) => {
  const globalDirectoryVideoInfoList = remote.getGlobal("sharedObject").DIRECTORY.VIDEOS;

  let directoryVideoTitleList = [];

  globalDirectoryVideoInfoList.forEach((videoInfo) => {
    directoryVideoTitleList.push(videoInfo.name);
  })

  const readContent = jsonControl.getJSONFile(remote.getGlobal("sharedObject").JSON_FILE.PATH);

  if (!readContent.result) {
    alert(readContent.content);
    return;
  }

  const JSONFile = new jsonFileDTO(readContent.content);
  const JSONVideoInfoList = JSONFile.getVideos();

  let jsonVideoTitleList = [];

  JSONVideoInfoList.forEach((videoInfo) => {
    jsonVideoTitleList.push(videoInfo.title);
  })

  let nowVideoIndex = directoryVideoTitleList.indexOf(nowVideoTitle);
  let length = directoryVideoTitleList.length;

  for (let i = (nowVideoIndex + 1); i < (length + nowVideoIndex); i++) {
    const nextTargetIndex = (i % length);
    const nextTarget = directoryVideoTitleList[nextTargetIndex];

    if (jsonVideoTitleList.indexOf(nextTarget) == -1) {
      return nextTarget;
    }
  }
}

export default {
  initialize,
  showVideoFiles,
  checkCompletedVideoFiles,
  markCompletedVideoFiles,
  showCompletedVideoFilesCount,
  searchNextVideo
}
