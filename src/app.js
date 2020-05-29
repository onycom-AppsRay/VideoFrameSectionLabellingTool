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

// import "./page/labelling/content/main/mainViewEvent.js";
import "./page/labelling/content/files/json/jsonFileEvent.js";
import "./page/labelling/content/files/directory/videoFileEvent.js";
import "./page/labelling/content/control1/frame/frameClickEvent.js";
import "./page/labelling/content/control2/complete/sectionClickEvent.js";
import "./page/labelling/content/control2/complete/completeBtnEvent.js";
import "./page/labelling/content/control2/complete/updateBtnEvent.js";
import "./page/labelling/content/control2/push/confirmSectionEvent.js";
import "./page/labelling/content/control2/push/criteriaSectionEvent.js";

import "./page/criteria/insert.js";
import "./page/criteria/apply.js";
import "./page/directory/openDirectory.js";
import "./page/file/importExistingFile.js";
import "./page/file/createJSONFile.js";

import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import "./helpers/key_event.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

// test
// import "../test/page/labelling/frameExtract.js";

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

import mainViewContainer from "./page/labelling/content/main/mainViewContainer";

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

// Holy crap! This is browser window with HTML and stuff, but I can read
// files from disk like it's node.js! Welcome to Electron world :)
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
})();
