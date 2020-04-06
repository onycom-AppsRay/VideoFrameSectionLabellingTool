import tagControl from "../../helpers/tag_control";
import jsonControl from "../../helpers/json_control";
import fileExplorer from "../../helpers/file_explorer";

const initialize = () => {
  const videoFilesContainer = document.getElementById("video-files-container");

  tagControl.initialize(videoFilesContainer);
}

const showVideoFiles = (videoFiles, completedVideoFiles) => {
  const videoFilesContainer = document.getElementById("video-files-container");

  Array.prototype.forEach.call(videoFiles, (fileInfo) => {
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

  markCompletedVideoFiles(completedVideoFiles);
}

const checkCompletedVideoFiles = (directoryPath, jsonFilePath) => {
  let result = [];

  console.log(directoryPath);
  console.log(jsonFilePath);

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
    showDirectoryVideoFilesCount(videoFiles);
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

export default {
  initialize,
  showVideoFiles,
  checkCompletedVideoFiles,
  markCompletedVideoFiles,
}
