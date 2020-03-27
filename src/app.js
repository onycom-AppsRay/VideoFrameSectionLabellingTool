import "./import";

import "./stylesheets/main.css";
import "./stylesheets/main.css";
import "./stylesheets/section/header.css";
import "./stylesheets/section/content.css";
import "./stylesheets/section/footer.css";
import "./stylesheets/element/frame_index_container.css";

// Small helpers you might want to keep
import "./helpers/context_menu.js";
import "./helpers/external_links.js";

import "./renderer_process/open_directory.js";
import "./renderer_process/open_file.js";
import "./renderer_process/create_json.js";
import "./renderer_process/key_event.js";
import "./renderer_process/confirm_section.js";
import "./renderer_process/complete.js";

import "./test";

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
  console.log("JSON_FILE \n", JSON.stringify(remote.getGlobal("sharedObject").JSON_FILE));
  console.log("VIDEO_DATA \n", JSON.stringify(remote.getGlobal("sharedObject").VIDEO_DATA));
  console.log("FRAME \n", JSON.stringify(remote.getGlobal("sharedObject").FRAME));
})();

document.querySelector("#app").style.display = "block";
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#author").innerHTML = manifest.author;
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML = process.versions.electron;

document.querySelector("#main-view-image-container").setAttribute("style", "top: 50%; transform: translateY(-50%)")
document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic.png");
document.querySelector("#main-view-image").setAttribute("style", "width: 100%;");
