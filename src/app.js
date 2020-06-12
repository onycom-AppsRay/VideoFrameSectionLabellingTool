import "./helpers/import.js";

import "./stylesheets/main.css";
import "./stylesheets/section/header.css";
import "./stylesheets/section/content.css";
import "./stylesheets/section/footer.css";
import "./stylesheets/section/about.css";
import "./stylesheets/section/criteria.css";
import "./stylesheets/element/frame_index_container.css";
import "./stylesheets/page/open_directory.css";
import "./stylesheets/page/open_file.css";
import "./stylesheets/page/form_criteria.css";

import "./page/labelling/header/nav.js";
import "./page/labelling/header/back.js";

import "./page/labelling/list/file/json/jsonFileEvent.js";
import "./page/labelling/list/file/video/videoFileEvent.js";
import "./page/labelling/list/result/sectionClickEvent.js";
import "./page/labelling/list/criteria/criteriaSectionEvent.js";
import "./page/labelling/frame/list/frameClickEvent.js";
import "./page/labelling/button/complete/completeBtnEvent.js";
import "./page/labelling/button/complete/updateBtnEvent.js";
import "./page/labelling/button/push/confirmSectionEvent.js";

import "./page/criteria/insert.js";
import "./page/criteria/apply.js";
import "./page/video/VideoDirectory.js";
import "./page/json/create/JSONCreator.js";
import "./page/json/open/JSONDirectory.js";

import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import "./helpers/key_event.js";

// HTML test
// Video Directory Page
// import VideoDirectory from "../test/page/video/VideoDirectory.spec.js"

// // jsonfile page
// import JSONFile from "../test/page/json/create/JSONFile.spec.js";

// // Criteria Page
// import CriteriaCreator from "../test/page/criteria/CriteriaCreator.spec.js";

// // labelling page
// import CriteriaList from "../test/page/main/list/CriteriaList.spec.js";
// import FrameList from "../test/page/main/list/FrameList.spec.js";
// import JSONFileList from "../test/page/main/list/JSONFileList.spec.js";

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

import mainViewContainer from "./page/labelling/frame/main/mainViewContainer";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

const manifest = appDir.read("package.json", "json");

const osMap = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};

const initGlobalVariable = () => {
  remote.getGlobal("sharedObject").JSON_FILE.PATH = "";
  remote.getGlobal("sharedObject").JSON_FILE.NAME = "";
  remote.getGlobal("sharedObject").DIRECTORY.PATH = "";
  remote.getGlobal("sharedObject").DIRECTORY.VIDEOS = [];
  remote.getGlobal("sharedObject").CRITERIA = [];
  remote.getGlobal("sharedObject").COMPLETE_FLAG = true;

  document.getElementById("complete").style.display = "";
  document.getElementById("update").style.display = "none";

  document.querySelector(".js-content").style.display = "none";
}

const projectInfo = () => {
  document.querySelector("#app-info").style.display = "block";
  document.querySelector("#os").innerHTML = osMap[process.platform];
  document.querySelector("#author").innerHTML = `${manifest.author}` + `&copy;` + `onycom`;
  document.querySelector("#env").innerHTML = env.name;
}

(() => {
  projectInfo();
  initGlobalVariable();
  mainViewContainer.initialize();

  // CriteriaList.showCriterias();
  // FrameList.showFrameList();
  // JSONFileList.showList();
  // JSONFile.init();
  // VideoDirectory.init();
  // CriteriaCreator.init();
})();
