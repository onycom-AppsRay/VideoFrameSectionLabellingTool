import { remote } from "electron";

import path from "path";

import globalFrame from "../../../../../model/global/globalFrame";
import globalVideoData from "../../../../../model/global/globalVideoData";

import videoCapture from "../../../../../helpers/video/videoCapture";

import mainViewContainer from "../../../frame/main/mainViewContainer";
import frameListContainer from "../../../frame/list/frameListContainer";
import resultContainer from "../../result/resultContainer";

const jsonFileContainer = document.getElementById("json-file-container");

jsonFileContainer.onclick = async (event) => {

  // 'COMPLETE' 시, 수정 기능 활성화.
  if (!remote.getGlobal("sharedObject").COMPLETE_FLAG) {
    alert("라벨링 작업 완료('COMPLETE') 후, 수정이 가능합니다.");
    return false;
  }

  if (event.target.className != "json-video-file") {
    return false;
  }

  if (!confirm(`'${event.target.dataset.title}' 의 데이터를 수정하시겠습니까? \n` +
    `(수정 시작 시, 비디오 제원에 대한 미리보기는 중단 됩니다.)`)) {
    return false;
  }

  const title = event.target.dataset.title;

  document.getElementById("video-title").innerText = title;
  document.getElementById("complete").style.display = "none";
  document.getElementById("update").style.display = "";

  mainViewContainer.initialize();
  frameListContainer.initialize();
  resultContainer.initialize();

  // extract video frame list
  const directoryPath = remote.getGlobal("sharedObject").DIRECTORY.PATH;

  const filePath = path.join(directoryPath, title);

  const video = mainViewContainer.getVideoTag(filePath);
  mainViewContainer.setMainFrameRate(video);

  const videoCaptureList = videoCapture.extractFrames(filePath, document.querySelector(`video[id="hidden-video"]`).clientWidth);

  const GlobalVideoData = new globalVideoData();
  GlobalVideoData.setPATH(directoryPath);
  GlobalVideoData.setTITLE(title);

  const GlobalFrame = new globalFrame();
  GlobalFrame.setAT(0);
  GlobalFrame.setLENGTH(videoCaptureList.length);

  // show frame list
  frameListContainer.showFrameList(videoCaptureList);

  document.getElementById("main-view-image").hidden = false;
  document.getElementById("hidden-video").hidden = true;

  // show labelling data
  resultContainer.showLabellingDataInJSON(
    remote.getGlobal("sharedObject").JSON_FILE.PATH,
    title
  );

  remote.getGlobal("sharedObject").COMPLETE_FLAG = false;
}

jsonFileContainer.onmouseover = (event) => {

  // 'COMPLETE' 완료 시, 비디오 제원 미리보기 기능 활성화.
  if (!remote.getGlobal("sharedObject").COMPLETE_FLAG) {
    return false;
  }

  // 비디오 파일 명 위에 마우스 포인터 위치 시 제원 보여주기.
  if (event.target.className != "json-video-file") {
    return false;
  }

  resultContainer.initialize();

  // 저장되어 있는 라벨링 데이터 보여주기.
  resultContainer.showLabellingDataInJSON(
    remote.getGlobal("sharedObject").JSON_FILE.PATH,
    event.target.dataset.title
  );

  mainViewContainer.showVideoInfo(event);

  return true;
}

jsonFileContainer.onmouseleave = () => {
  if (!remote.getGlobal("sharedObject").COMPLETE_FLAG) {
    return false;
  }

  resultContainer.initialize();
  mainViewContainer.initVideoInfo();

  return true;
}