import { remote } from "electron";

import path from "path";

import tagControl from "../../../../../helpers/tag_control";

const initialize = () => {
  const jsonFileContainer = document.getElementById("json-file-container");
  tagControl.initialize(jsonFileContainer);
}

const setVideoFileTag = () => {
  const span = document.createElement("span");

  span.className = "json-video-file";
  span.id = title;
  span.innerText = title;
  span.style.wordBreak = "keep-all";

  span.dataset.path = path;
  span.dataset.title = title;
}

const showVideoFiles = (jsonVideos) => {
  const jsonFileContainer = document.getElementById("json-file-container");
  const directoryPath = remote.getGlobal("sharedObject").DIRECTORY.PATH;

  Array.prototype.forEach.call(jsonVideos, (videoInfo) => {
    const title = videoInfo.title.replace(/\ |-|#|&/gi, "");
    const filePath = path.join(directoryPath, title);

    const span = document.createElement("span");

    span.className = "json-video-file";
    span.id = title;
    span.dataset.path = filePath;
    span.dataset.title = videoInfo.title;
    span.innerText = title;
    span.style.wordBreak = "keep-all";

    jsonFileContainer.appendChild(span);
    jsonFileContainer.appendChild(document.createElement("br"));
  })

  showJSONVideoFilesCount(jsonVideos);
}

const showJSONVideoFilesCount = (fileList) => {
  document.getElementById("json-file-video-data-count").innerHTML = fileList.length;
}

export default {
  initialize,
  showVideoFiles
}
