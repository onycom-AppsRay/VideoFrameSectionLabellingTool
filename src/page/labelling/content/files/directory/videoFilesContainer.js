import path from "path";
import fs from "fs";

import tagControl from "../../../../../helpers/tag_control";
import jsonControl from "../../../../../helpers/json/json_control";

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

  if (directoryPath && jsonFilePath) {
    const dirFiles = fs.readdirSync(directoryPath);

    let videoFiles = [];

    dirFiles.forEach((dirFile) => {
      const extension = path.extname(file);

      if (extension == ".avi" || extension == ".mov" || extension == ".mp4") {
        videoFiles.push(dirFile);
      }
    })

    const completedVideoFiles = jsonControl.getJSONFile(jsonFilePath).videos;

    videoFiles.forEach((video) => {
      completedVideoFiles.forEach((completedVideoFile) => {
        if (video.name == completedVideoFile.title) {
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

  for (let i = 0; i < completedVideoFiles.length; i++) {
    let completedVideoFileTitle = completedVideoFiles[i];

    for (let j = 0; j < videoFiles.length; j++) {
      let videoFileTitle = videoFiles[j].id;

      if (completedVideoFileTitle == videoFileTitle) {
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

export default {
  initialize,
  showVideoFiles,
  checkCompletedVideoFiles,
  markCompletedVideoFiles,
  showCompletedVideoFilesCount
}
