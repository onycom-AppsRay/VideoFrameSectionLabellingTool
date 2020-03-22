import { ipcRenderer, remote } from "electron";
import fs from "fs";

import fileExplorer from "../helpers/file_explorer";

const selectedCreateJson = document.getElementById("create-json");

let GLOBAL_JSON_FILE = remote.getGlobal("sharedObject").JSON_FILE;

selectedCreateJson.addEventListener("click", (event) => {
  ipcRenderer.send("open-json-directory-dialog");
});

ipcRenderer.on("selected-json-directory", (event, pathArr) => {
  const path = pathArr[0];
  const fileName = createJSONFileName();

  // Duplicate check
  if (!hasJSONFile(path, fileName)) {
    alert(`생성하려는 파일과 동일한 이름의 파일이 있습니다. \n ${fileName}`);
    return;
  }

  document.getElementById("create-json").innerHTML = fileName;

  GLOBAL_JSON_FILE.PATH = path;
  GLOBAL_JSON_FILE.NAME = fileName;

  console.log(GLOBAL_JSON_FILE);

  fs.writeFile(path + "/" + fileName, JSON.stringify(jsonFile, " ", 2), (err) => {
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

      return false;
    }
  })

  return flag;
}

const createJSONFileName = () => {
  const year = (new Date().getFullYear()).toString();
  const month = (new Date().getMonth() + 1).toString();;
  const date = (new Date().getDate()).toString();
  const extension = "json";

  return year.concat(month)
    .concat(date)
    .concat(".")
    .concat(extension);
}

const jsonFile = {
  "name": "",
  "create": new Date(),
  "count": 0,
  "criteria": {},
  "data": []
}

const criteriaData = {
  "number": "",
  "criteria": "",
}

const videoData = {
  "title": "",
  "data": []
}
