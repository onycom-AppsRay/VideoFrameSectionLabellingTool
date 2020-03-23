import { ipcRenderer, remote } from "electron";
import fs from "fs";

import tagControl from "../helpers/tag_control";
import validation from "../helpers/validation";

import globalValiable from "../model/global_valiable";

const selectJsonBtn = document.getElementById("open-json");
const jsonFileContainer = document.getElementById("json-file-container");

selectJsonBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-file-dialog");
})

ipcRenderer.on("selected-file", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = getFileName(path);

  tagControl.initialize(jsonFileContainer);

  document.getElementById("open-json").innerHTML = `${fileName}`;

  // Read JSON
  const openJSONFileContent = readJSONFile(path);

  // Validate JSON
  if (validation.validationValue(openJSONFileContent)) {
    alert("유효한 JSON 파일 입니다.");
  } else {
    alert("유효하지 않은 JSON 파일 입니다.");
    return;
  }

  // global setting
  const GlobalValiable = new globalValiable();

  // json setting
  GlobalValiable.setJSONFile(path, fileName, "");

  // video data setting
  const videos = openJSONFileContent.videos;
  GlobalValiable.setVideoData(videos);

  addCompletedVideoTitleTag(videos);

  // 빈 파일인 경우
  // 저장된 데이터가 있는 경우
});

const addCompletedVideoTitleTag = (videos) => {
  videos.forEach((video) => {
    const nameTag = tagControl.createNameTag("completed-video-title", video.title, "");
    const br = document.createElement("br");

    document.getElementById("json-file-container").appendChild(br);
    document.getElementById("json-file-container").appendChild(nameTag);
  })
}

const readJSONFile = (path) => {
  return JSON.parse(fs.readFileSync(path));
}

const getFileName = (path) => {
  const pathElement = path.split("/");

  return pathElement[pathElement.length - 1];
}
