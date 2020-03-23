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

import "./renderer_process/open_directory";
import "./renderer_process/open_file";
import "./renderer_process/create_json";
import "./renderer_process/key_event.js";
import "./renderer_process/open_directory.js";
import "./renderer_process/confirm_section.js";
import "./renderer_process/complete.js";

import "./test";

// ----------------------------------------------------------------------------
// Everything below is just to show you how it works. You can delete all of it.
// ----------------------------------------------------------------------------

import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

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

document.querySelector("#app").style.display = "block";
document.querySelector("#os").innerHTML = osMap[process.platform];
document.querySelector("#author").innerHTML = manifest.author;
document.querySelector("#env").innerHTML = env.name;
document.querySelector("#electron-version").innerHTML =
  process.versions.electron;
