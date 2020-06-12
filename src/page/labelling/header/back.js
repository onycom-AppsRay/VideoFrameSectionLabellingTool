import { remote } from "electron";

import JSONFileDTO from "../../../model/dto/JSONFile";

import tagControl from "../../../helpers/tag_control";

import mainViewContainer from "../frame/main/mainViewContainer";
import frameListContainer from "../frame/list/frameListContainer";
import resultContainer from "../list/result/resultContainer";

const openDirectoryPage = document.getElementById("open-directory-page");
const openFilePage = document.getElementById("open-file-page");
const formCriteriaPage = document.getElementById("form-criteria-page");

const backBtn = document.getElementById("back-button");

backBtn.addEventListener("click", (event) => {
  
  if(!confirm("첫 단계로 돌아갈 시, 현재 데이터는 초기화 됩니다.")) {
    return false;
  }

  initGlobalVariable();
  initEachSectionContent();

  openDirectoryPage.style.display = "";
  openFilePage.style.display = "";
  formCriteriaPage.style.display = "";
});

const initGlobalVariable = () => {
  remote.getGlobal("sharedObject").JSON_FILE.PATH = "";
  remote.getGlobal("sharedObject").JSON_FILE.NAME = "";
  remote.getGlobal("sharedObject").DIRECTORY.PATH = "";
  remote.getGlobal("sharedObject").DIRECTORY.VIDEOS = [];
  remote.getGlobal("sharedObject").VIDEO_DATA.PATH = "";
  remote.getGlobal("sharedObject").VIDEO_DATA.TITLE = "";
  remote.getGlobal("sharedObject").VIDEO_DATA.FRAME_LIST = [];
  remote.getGlobal("sharedObject").FRAME.LENGTH = 0;
  remote.getGlobal("sharedObject").FRAME.AT = 0;
  remote.getGlobal("sharedObject").CRITERIA = [];

  new JSONFileDTO().init();

  // directory list 'mouse over' event flag
  remote.getGlobal("sharedObject").COMPLETE_FLAG = true;
}

const initEachSectionContent = () => {
  document.querySelector(".js-content").style.display = "none";
  
  // header
  document.getElementById("directory-path").innerText = "";
  document.getElementById("json-file-path").innerText = "";

  // 'file explorer' section
  document.getElementById("completed-video-count").innerText = 0;
  document.getElementById("total-video-count").innerText = 0;
  document.getElementById("json-file-video-data-count").innerText = 0;

  tagControl.initialize(document.getElementById("video-files-container"));
  tagControl.initialize(document.getElementById("json-file-container"));

  // 'main frame' section
  document.getElementById("video-title").innerText = "";
  document.getElementById("frame-index").innerText = "";
  mainViewContainer.initialize();

  // 'frame list' section
  frameListContainer.initialize();

  // 'START', 'END' frame index section
  document.getElementById("start-frame-input").innerText = 0;
  document.getElementById("end-frame-input").innerText = 0;

  // 'criteria' section
  tagControl.initialize(document.getElementById("criteria-list"));

  // 'labelling data' section
  resultContainer.initialize();
}
