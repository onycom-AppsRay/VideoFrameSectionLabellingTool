import { ipcRenderer, remote } from "electron";
import fileExplorer from "../helpers/file_explorer.js";
import videoControl from "../helpers/video_control.js";
import tagControl from "../helpers/tag_control.js";
import imageControl from "../helpers/image_control.js";

const selectDirBtn = document.getElementById("open-directory");
const videoFliesContainer = document.getElementById("video-files-container");

let GLOBAL_FRAME = remote.getGlobal("sharedObject").FRAME;

// Video Directory
selectDirBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-directory-dialog");
});

ipcRenderer.on("selected-directory", (event, path) => {
  tagControl.initialize(videoFliesContainer);

  document.getElementById("open-directory").innerHTML = `${path}`;
  document.getElementById("open-directory").style.fontSize = "1vw";

  const result = fileExplorer.getFileList(`${path}`);

  result.forEach((value, index) => {
    const span = createVideoNameTag(value);

    const br = document.createElement("br");

    videoFliesContainer.appendChild(span).innerHTML = `${index}.&nbsp;${value.name}`;
    span.appendChild(br);
  });
});

const createVideoNameTag = info => {
  const span = document.createElement("span");
  span.setAttribute("class", "video-file");
  span.setAttribute("data-info", JSON.stringify(info, null, 2));

  span.addEventListener("click", (event) => {
    clickedVideoName(event.target);
  }, false);

  return span;
}

const clickedVideoName = element => {
  // Initialize 'container'
  videoControl.initialize();

  // Capture 'video'
  console.log("Play");

  const info = fileInfo(element);
  const path = info.path;

  const video = videoControl.createVideoTag(path, 5);

  videoControl.playVideo(video, 5, imageDataList => {
    GLOBAL_FRAME["LENGTH"] = imageDataList.length;
    // setFrameList
    imageDataList.forEach((imageData, index) => {
      const dataUrl = imageControl.imageDataToImage(imageData, 0.1);
      imageControl.setImage(dataUrl, index, "100%", "");
    })
  })

  // Rendering next video
}

const fileInfo = element => {
  const dataset = JSON.parse(element.dataset.info);

  return {
    "path": dataset.path,
    "name": dataset.name,
    "size": dataset.size,
    "extension": dataset.extension,
    "type": dataset.type,
  }
}
