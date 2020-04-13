import { ipcRenderer, remote } from "electron";

import jsonControl from "../../helpers/json_control";

import videoFilesContainer from "../../section/video/videoFilesContainer";
import jsonFileContainer from "../../section/json/jsonFileContainer";
import criteriaContainer from "../../section/criteria/criteriaContainer";

const openFileButton = document.getElementById("open-file-button");

const openFilePage = document.getElementById("open-file-page");
const formCriteriaPage = document.getElementById("form-criteria-page");

const goFormCriteriaPageBtn = document.getElementById("go-form-criteria-page-btn");

let pageMoveFlag = false;
let hasCriteria = false;

openFileButton.onclick = () => {
  ipcRenderer.send("open-file-dialog");
};

ipcRenderer.on("selected-file", (event, pathArr) => {
  const filePath = pathArr[0];

  remote.getGlobal("sharedObject").JSON_FILE.PATH = filePath;

  // JSON 파일이 맞는지 검사, 유효한 JSON 인지 검사
  const readContent = jsonControl.getJSONFile(filePath);
  if (!readContent.result) {
    alert(readContent.content);
    return;
  }

  const json = readContent.content;
  const jsonCriteria = json.criteria;
  const jsonVideos = json.videos;

  // JSON 파일 내에 'criteria(기준)'이 명시 되어있는지 검사
  if(jsonCriteria.length > 0) {
    // 'criteria(기준)'이 있으면 'labelling' 페이지로 이동
    // GO LABELLING PAGE

    remote.getGlobal("sharedObject").CRITERIA = jsonCriteria;

    // 사용자가 저장해 놓은 JSON에 있는 기준 보여주기
    criteriaContainer.setCriteria();

    // 비디오 파일 보여주기
    const directoryVideos = remote.getGlobal("sharedObject").DIRECTORY.VIDEOS;

    const matchedVideos = jsonControl.matchingVideoTitle(directoryVideos, jsonVideos);

    videoFilesContainer.showVideoFiles(directoryVideos, matchedVideos);
    jsonFileContainer.showVideoFiles(json);

    hasCriteria = true;

    document.querySelector("#open-file-path > p").innerHTML = filePath;

    return;
  } else {
    // 'criteria(기준)'이 없으면 'criteria' 페이지로 이동
    // GO CRITERIA PAGE

    hasCriteria = false;

    document.querySelector("#open-file-path > p").innerHTML = filePath;

    return;
  }
});

goFormCriteriaPageBtn.onclick = () => {
  if(hasCriteria) {
    openFilePage.style.display = "none";
    formCriteriaPage.style.display = "none";

    jsContent.style.display = "";
  } else {
    openFilePage.style.display = "none";
  }
}
