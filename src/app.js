import "./import";

import "./stylesheets/main.css";
import "./stylesheets/main.css";
import "./stylesheets/section/header.css";
import "./stylesheets/section/content.css";
import "./stylesheets/section/footer.css";
import "./stylesheets/section/about.css";
import "./stylesheets/section/criteria.css";
import "./stylesheets/element/frame_index_container.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";
import "./helpers/criteria.js";

import "./event/file/videoFileEvent.js";

import "./renderer_process/open_directory.js";
import "./renderer_process/open_file.js";
import "./renderer_process/create_json.js";
import "./renderer_process/key_event.js";
import "./renderer_process/confirm_section.js";
import "./renderer_process/complete.js";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";
import path from "path";

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

(() => {
  console.log("JSON_FILE \n", JSON.stringify(remote.getGlobal("sharedObject").JSON_FILE, " ", 2));
  console.log("VIDEO_DATA \n", JSON.stringify(remote.getGlobal("sharedObject").VIDEO_DATA, " ", 2));
  console.log("FRAME \n", JSON.stringify(remote.getGlobal("sharedObject").FRAME, " ", 2));
  console.log("CRITERIA \n", JSON.stringify(remote.getGlobal("sharedObject").CRITERIA, " ", 2));

  remote.getGlobal("sharedObject").JSON_FILE.PATH = "";
  remote.getGlobal("sharedObject").JSON_FILE.NAME = "";
})();

document.querySelector("#app").style.display = "block";
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#author").innerHTML = manifest.author;
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML = process.versions.electron;

// main view init
document.querySelector("#main-view-image-container").setAttribute("style", "top: 50%; transform: translateY(-50%)")
document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic.png");
document.querySelector("#main-view-image").setAttribute("style", "width: 100%;");

// criteria init
// remote.getGlobal("sharedObject").CRITERIA.forEach((value, index) => {
//   const criteria = value.replace(/\ /, "&nbsp;");

//   const li = document.createElement("li");
//   li.className = "list-group-item";
//   li.innerHTML = [
//     `<div class="custom-control custom-radio">`,
//     `<input type="radio" id="creteria${index}" name="creteria" class="custom-control-input">`,
//     `<label class="custom-control-label" for="creteria${index}">${criteria}</label>`,
//     `</div>`
//   ].join("");

//   document.querySelector("#criteria-list").appendChild(li);
// })
