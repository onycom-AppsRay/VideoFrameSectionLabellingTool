import { ipcRenderer, remote } from "electron";
import fs from "fs";

import JSONFile from "../model/jsonFile";

const selectedCreateJson = document.getElementById("create-json");

let GLOBAL_JSON_FILE = remote.getGlobal("sharedObject").JSON_FILE;

selectedCreateJson.addEventListener("click", (event) => {
  ipcRenderer.send("open-json-directory-dialog");
});

ipcRenderer.on("selected-json-directory", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = createFileNameWithCurrentTime(".json");

  // Duplicate check
  if (!hasJSONFile(path, fileName)) {
    alert(`생성하려는 파일과 동일한 이름의 파일이 있습니다. \n ${fileName}`);
    return;
  }

  document.getElementById("create-json").innerHTML = fileName;

  GLOBAL_JSON_FILE.PATH = path;
  GLOBAL_JSON_FILE.NAME = fileName;

  const json = new JSONFile(fileName, new Date().toLocaleString(), 0, {}, []);

  fs.writeFile(path + "/" + fileName, JSON.stringify(json, " ", 2), (err) => {
    if (err) throw err;
    alert(`The JSON file was created in path ${path}`);
  });
});

const hasJSONFile = (path, fileName) => {
  let flag = true;

  const dirList = fs.readdirSync(path);

  dirList.some((file) => {
    if(file == fileName) {
      flag = false;

      return;
    }
  })

  return flag;
}

const createFileNameWithCurrentTime = (extension) => {
  return new Date(Date.now()).toLocaleDateString().replace(/\//gi, "_").concat(`${extension}`);
}
