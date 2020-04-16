import { ipcRenderer, remote } from "electron";

import jsonControl from "../../helpers/json_control";

import videoFilesContainer from "../labelling/content/files/directory/videoFilesContainer";
import jsonFileContainer from "../labelling/content/files/json/jsonFileContainer";

import jsonContentDTO from "../../model/dto/jsonFile";

const openFileButton = document.getElementById("open-file-button");

const openFilePage = document.getElementById("open-file-page");
const formCriteriaPage = document.getElementById("form-criteria-page");
const jsContent = document.getElementsByClassName("js-content")[0];

const goLabellingPageBtn = document.querySelector(`#open-file-page-container button[name="go-labelling"]`);

let filePath;
let jsonCriteria;
let jsonVideos;

openFileButton.onclick = () => {
  ipcRenderer.send("open-file-dialog");
};

ipcRenderer.on("selected-file", (event, pathArr) => {
  filePath = pathArr[0];

  // 불러 온 'JSON' 파일이 유효한 파일인지 검사('JSON' 인지 확인 & 'JSON' 내부의 값 확인)
  const readContent = jsonControl.getJSONFile(filePath);

  if (!readContent.result) {
    alert(readContent.content);
    return;
  }

  // 객체로 매핑하여, 각 요소들 검사 및 메소드 활용.
  const JSONContent = new jsonContentDTO(readContent.content);

  jsonCriteria = JSONContent.getCriterias();
  jsonVideos = JSONContent.getVideos();

  // JSON 파일 내에 'criteria(기준)'이 명시 되어있는지 검사
  if (jsonCriteria.length > 0) {
    // GO LABELLING PAGE
    // 현재 페이지에 파일 경로 보여주기.
    document.querySelector("#open-file-path > p").innerText = filePath;

    goLabellingPageBtn.hidden = "";

    return;
  } else {
    // GO CRITERIA PAGE
    alert("저장 된 기준이 없습니다. 새로운 작업 파일을 만드세요.");

    return;
  }
});

goLabellingPageBtn.onclick = () => {
  // 'labelling' 페이지에 파일 경로 보여주기.
  document.getElementById("json-file-path").innerText = filePath;

  remote.getGlobal("sharedObject").JSON_FILE.PATH = filePath;
  remote.getGlobal("sharedObject").CRITERIA = jsonCriteria;

  // 사용자가 저장해 놓은 JSON에 있는 기준 보여주기
  Array.prototype.forEach.call(jsonCriteria, (criteria) => {
    const type = criteria.type;
    const text = criteria.text;

    showCriteria(type, text);
  })

  // 'json file' section 에 비디오 파일 보여주기
  if (jsonVideos.length > 0) {
    jsonFileContainer.showVideoFiles(jsonVideos);

    const directoryVideos = remote.getGlobal("sharedObject").DIRECTORY.VIDEOS;

    let directoryVideoNameList = [];
    directoryVideos.forEach((directoryVideo) => {
      directoryVideoNameList.push(directoryVideo.name);
    });

    let jsonVideoTitleList = [];
    jsonVideos.forEach((jsonVideo) => {
      jsonVideoTitleList.push(jsonVideo.title);
    })

    const completedVideoFiles = jsonControl.matchingVideoTitle(directoryVideoNameList, jsonVideoTitleList);

    videoFilesContainer.markCompletedVideoFiles(completedVideoFiles);
    videoFilesContainer.showCompletedVideoFilesCount(completedVideoFiles);
  }

  openFilePage.style.display = "none";
  formCriteriaPage.style.display = "none";
  jsContent.style.display = "";

  document.querySelector("#open-file-path > p").innerHTML = `.&nbsp;.&nbsp.`;

  goLabellingPageBtn.hidden = true;
}

const showCriteria = (type, criteria) => {
  const li = document.createElement("li");

  li.className = "list-group-item";
  li.innerHTML = [
    `<div class="custom-control custom-radio">`,
    `<input type="radio" class="custom-control-input" id="criteria-${type}" name="criteria" data-type="${type}" data-criteria="${criteria}">`,
    `<label class="custom-control-label" for="criteria-${type}">${type}.&nbsp;${criteria}</label>`,
    `</div>`
  ].join("");

  document.getElementById("criteria-list").appendChild(li);
}
