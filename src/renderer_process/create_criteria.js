import { ipcRenderer, remote } from "electron";
import path from "path";

import globalCriteria from "../model/globalCriteria";

const createCriteria = document.getElementById("create-criteria");
const creteriaList = document.getElementById("criteria-list");
const GlobalCriteria = new globalCriteria();

createCriteria.addEventListener('click', (event) => {
  let win = new remote.BrowserWindow({width: "50%", height: "30%"});

  win.webContents.on('did-finish-load', () => {
		win.webContents.send('message', GlobalCriteria.CRITERIA);
  });

  win.on('close', () => {
    win = null;
  });

  win.loadURL(path.join("file://", __dirname, "/window/create_criteria.html"));
  win.show();
});

ipcRenderer.on('messageFromMain', (event, message) => {
  const index = GlobalCriteria.CRITERIA.push(message);
  const criteria = message.replace(/\ /, "&nbsp;");

  const li = document.createElement("li");
  li.className = "list-group-item";
  li.innerHTML = [
    `<div class="custom-control custom-radio">`,
    `<input type="radio" id="customRadio${index}" name="customRadio" class="custom-control-input">`,
    `<label class="custom-control-label" for="customRadio${index}">${criteria}</label>`,
    `</div>`
  ].join("");

  creteriaList.appendChild(li);
})
