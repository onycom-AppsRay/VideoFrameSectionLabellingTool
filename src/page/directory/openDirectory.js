import { ipcRenderer, remote } from "electron";
import path from "path";
import fs from "fs";

import videoFileInfo from "../../model/dto/videoFileInfo";
import videoFilesContainer from "../labelling/content/files/directory/videoFilesContainer";

const goOpenFilePageBtn = document.getElementById("go-open-file-page-btn");
const openDirectoryPage = document.getElementById("open-directory-page");
const openDirectoryButton = document.getElementById("open-directory-button");

let directoryPath;
let pageMoveFlag = false;

openDirectoryButton.onclick = () => {
  ipcRenderer.send('open-directory-dialog');
};

ipcRenderer.on("selected-directory", (event, pathArr) => {
  directoryPath = pathArr[0];

  document.querySelector("#open-directory-path > p").innerHTML = directoryPath;

  goOpenFilePageBtn.hidden = "";

  pageMoveFlag = true
});

goOpenFilePageBtn.addEventListener("click", (event) => {
  if (pageMoveFlag) {
    // 'labelling' page 에 directory 경로 정보 나타내기.
    document.getElementById("directory-path").innerText = directoryPath;

    // 가져 온 비디오 폴더 경로 전역변수로 저장.
    remote.getGlobal("sharedObject").DIRECTORY.PATH = directoryPath;

    // 폴더로 부터 가져온 비디오 파일 객체에 담기.
    const videoList = getVideoFileList(directoryPath);

    // 'labelling' page 에 비디오 파일 리스트 보여주기.
    videoFilesContainer.showVideoFiles(videoList);

    // 폴더 내부의 비디오 정보들 전역변수로 저장.
    remote.getGlobal("sharedObject").DIRECTORY.VIDEOS = videoList;

    // 다음 페이지로 이동하기 위한 css trick.
    openDirectoryPage.style.display = "none";

    // 페이지 초기화.
    document.querySelector("#open-directory-path > p").innerHTML = `.&nbsp;.&nbsp;.`;
    goOpenFilePageBtn.hidden = true;

    return;
  } else {
    alert("비디오 폴더를 선택하세요.");

    return;
  }
})

const getVideoFileList = (dirPath) => {
  let result = [];

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const extension = path.extname(file);

    if(extension == ".avi" || extension == ".mov" || extension == ".mp4") {
      const VideoFileInfo = new videoFileInfo()
        .setName(file)
        .setPath(dirPath)
        .setExtension(extension);

      result.push(VideoFileInfo);
    }
  });

  return result;
}