import { ipcRenderer } from "electron";
import fs from "fs";

import tagControl from "../helpers/tag_control";

const selectJsonBtn = document.getElementById("open-json");
const jsonFileContainer = document.getElementById("json-file-container");

selectJsonBtn.addEventListener("click", (event) => {
  ipcRenderer.send("open-file-dialog");
})

ipcRenderer.on("selected-file", (event, path) => {
  tagControl.initialize(jsonFileContainer);

  document.getElementById("open-json").innerHTML = `${path}`;
  document.getElementById("open-json").style.fontSize = "1vw";

  // Read file("*.json")
  const content = fs.readFileSync(path);
  console.log(content);


  // 빈 파일인 경우

  // 저장된 데이터가 있는 경우
});
