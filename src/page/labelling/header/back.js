import { remote } from "electron";

const openDirectoryPage = document.getElementById("open-directory-page");
const openFilePage = document.getElementById("open-file-page");
const formCriteriaPage = document.getElementById("form-criteria-page");
const jsContent = document.getElementsByClassName("js-content")[0];

const backBtn = document.getElementById("back-button");

backBtn.addEventListener("click", (event) => {
  initGlobalVariable();
  initEachSectionContent();

  openDirectoryPage.style.display = "";
  openFilePage.style.display = "";
  formCriteriaPage.style.display = "";

  jsContent.style.display = "none";
});

const initGlobalVariable = () => {
  remote.getGlobal("sharedObject").JSON_FILE.PATH = "";
  remote.getGlobal("sharedObject").JSON_FILE.NAME = "";
  remote.getGlobal("sharedObject").DIRECTORY.PATH = "";
  remote.getGlobal("sharedObject").DIRECTORY.VIDEOS = [];
  remote.getGlobal("sharedObject").CRITERIA = [];
}

/**
 * 'header'
 * - 'path info': 'Directory Path' / 'JSON File Path'
 *
 * 'file explorer'
 * - 'directory list' / 'json file list'
 *
 * 'criteria'
 * - 'criteria list'
 *
 * 'labelling'
 * - 'labelling list'
 */
const initEachSectionContent = () => {
  // header
  const directoryPath = document.getElementById("directory-path");
  directoryPath.innerText = "";

  const jsonFilePath = document.getElementById("json-file-path");
  jsonFilePath.innerText = "";

  // 'file explorer' section
  const completedVideoCount = document.querySelector("#files-container .video-counting #completed-video-count");
  completedVideoCount.innerText = 0;
  const totalVideoCount = document.querySelector("#files-container .video-counting #total-video-count");
  totalVideoCount.innerText = 0;
  const directoryVideoFileContainer = document.querySelector("#files-container #video-files-container");
  initialize(directoryVideoFileContainer);

  const jsonVideoCount = document.querySelector("#files-container .json-counting #json-file-video-data-count");
  jsonVideoCount.innerText = 0;
  const jsonVideoFileContainer = document.querySelector("#files-container #json-file-container");
  initialize(jsonVideoFileContainer);

  // 'criteria' section
  const criteriaList = document.getElementById("criteria-list");
  initialize(criteriaList);
}

const initialize = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}
