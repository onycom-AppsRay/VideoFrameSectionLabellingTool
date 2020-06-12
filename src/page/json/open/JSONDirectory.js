import { ipcRenderer, remote } from "electron";

import jsonControl from "../../../helpers/json/json_control";
import JSONFileDTO from "../../../model/dto/JSONFile";

import videoFilesContainer from "../../labelling/list/file/video/videoFilesContainer";
import jsonFileContainer from "../../labelling/list/file/json/jsonFileContainer";
import criteriaContainer from "../../labelling/list/criteria/criteriaContainer";

const openFileButton = document.getElementById("open-file-button");
const goLabellingPageBtn = document.getElementById("go-labelling");

let filePath;

openFileButton.onclick = () => {
  ipcRenderer.send("open-file-dialog");
};

ipcRenderer.on("selected-file", (event, pathArr) => {
  filePath = pathArr[0];

  // 불러 온 'JSON' 파일이 유효한 파일인지 검사('JSON' 인지 확인 & 'JSON' 내부의 값 확인)
  const readJSON = jsonControl.getJSONFile(filePath);

  if (!readJSON.result) {
    alert(readJSON.content);
    return false;
  }
  
  // JSON 파일 내에 'criteria(기준)'이 명시 되어있는지 검사
  if (readJSON.content.criterias.length <= 0) {
    alert("저장 된 기준이 없습니다. 새로운 작업 파일을 만드세요.");
    return false;
  }

  new JSONFileDTO(readJSON.content);
  
  document.querySelector("#open-file-path > p").innerText = filePath;
  document.getElementById("go-write-criteria").hidden = true;   
  goLabellingPageBtn.hidden = "";

  return true;
});

goLabellingPageBtn.onclick = () => {

  const JSONFileObj = new JSONFileDTO();
  const criterias = JSONFileObj.getCriterias();
  const videos = JSONFileObj.getVideos();
  
  // 사용자가 저장해 놓은 JSON에 있는 기준 보여주기
  Array.prototype.forEach.call(criterias, (criteria) => {
    const type = String.fromCharCode(criteria.type + 64); //json에 결과값 입력 할 때만, 바꾸게 로직 변경하기
    const text = criteria.text;
    
    criteriaContainer.setCheckbox(type, text);
  })
  
  // 'json file' section 에 비디오 파일 보여주기
  if (videos.length > 0) {
    jsonFileContainer.showVideoFiles(videos);
    
    const directoryVideos = remote.getGlobal("sharedObject").DIRECTORY.VIDEOS;
    
    let directoryVideoNameList = [];
    directoryVideos.forEach((directoryVideo) => {
      directoryVideoNameList.push(directoryVideo.name);
    });
    
    let jsonVideoTitleList = [];
    videos.forEach((jsonVideo) => {
      jsonVideoTitleList.push(jsonVideo.title);
    })
    
    const completedVideoFiles = jsonControl.matchingVideoTitle(directoryVideoNameList, jsonVideoTitleList);
    
    videoFilesContainer.markCompletedVideoFiles(completedVideoFiles);
    videoFilesContainer.showCompletedVideoFilesCount(completedVideoFiles);
  }
  
  // 'labelling' 페이지에 파일 경로 보여주기.
  document.querySelector("#json-file-path").innerText = filePath;

  // Change page.
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector(".js-content").style.display = "";

  // Initialized imported JSON file path display.
  document.querySelector("#open-file-path > p").innerHTML = `.&nbsp;.&nbsp.`;

  goLabellingPageBtn.hidden = true;
}