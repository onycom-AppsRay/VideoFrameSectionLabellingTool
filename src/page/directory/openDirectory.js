import { ipcRenderer, remote } from "electron";

import fileExplorer from "../../helpers/file_explorer";

const goOpenFilePageBtn = document.getElementById("go-open-file-page-btn");
const openDirectoryPage = document.getElementById("open-directory-page");

const openDirectoryButton = document.getElementById("open-directory-button");

let pageMoveFlag = false;

openDirectoryButton.onclick = () => {
  ipcRenderer.send('open-directory-dialog');
};

ipcRenderer.on("selected-directory", (event, pathArr) => {
  const directoryPath = pathArr[0];

  pageMoveFlag = true

  remote.getGlobal("sharedObject").DIRECTORY.PATH = directoryPath;

  const videoList = fileExplorer.getFileList(directoryPath);

  remote.getGlobal("sharedObject").DIRECTORY.VIDEOS = videoList;

  document.querySelector("#open-directory-path > p").innerHTML = directoryPath;
});

goOpenFilePageBtn.addEventListener("click", (event) => {
  if(pageMoveFlag) {
    openDirectoryPage.style.display = "none";

    return;
  } else {
    alert("비디오 폴더를 선택하세요.");

    return;
  }
})
