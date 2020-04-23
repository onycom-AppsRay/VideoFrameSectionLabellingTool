import tagControl from "../../../../../helpers/tag_control";

const initialize = () => {
  const jsonFileContainer = document.getElementById("json-file-container");
  tagControl.initialize(jsonFileContainer);
}

const showVideoFiles = (jsonVideos) => {
  const jsonFileContainer = document.getElementById("json-file-container");

  const videos = jsonVideos;

  videos.forEach((videoInfo) => {
    const title = videoInfo.title.replace(/\ |-|#|&/gi, "");

    const span = document.createElement("span");
    span.className = "json-video-file";
    span.id = title;
    span.innerText = title;

    jsonFileContainer.appendChild(span);
    jsonFileContainer.appendChild(document.createElement("br"));
  })

  showJSONVideoFilesCount(videos);
}

const showJSONVideoFilesCount = (fileList) => {
  document.getElementById("json-file-video-data-count").innerHTML = fileList.length;
}

export default {
  initialize,
  showVideoFiles
}
