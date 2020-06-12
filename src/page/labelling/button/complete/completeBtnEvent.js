import { remote } from "electron";

import jsonControl from "../../../../helpers/json/json_control";

import videoDataDTO from "../../../../model/dto/videoData";
import JSONFileDTO from "../../../../model/dto/JSONFile";

import resultContainer from "../../list/result/resultContainer";
import mainViewContainer from "../../frame/main/mainViewContainer";
import frameListContainer from "../../frame/list/frameListContainer";
import inputFrameIndexContainer from "../push/inputFrameIndexContainer";
import jsonFileContainer from "../../list/file/json/jsonFileContainer";
import videoFilesContainer from "../../list/file/video/videoFilesContainer";

const COMPLETE_BTN = document.getElementById("complete");

/**
 * 'COMPLETE' Button
 * - 파일에 라벨링 데이터 입력(write).
 * - 'result' Section 의 데이터를 읽어들여서, 입력하는 방식.
 */
COMPLETE_BTN.addEventListener("click", (event) => {

  if (!confirm("작업을 완료하시겠습니까?")) {
    return;
  }
  
  const GLOBAL = remote.getGlobal("sharedObject");

  const VIDEO_TITLE = GLOBAL.VIDEO_DATA.TITLE;
  const VIDEO_FRAME_LENGTH = GLOBAL.FRAME.LENGTH;

  const JSONFileObj = new JSONFileDTO();
  const JSONVideos = JSONFileObj.getVideos();

  if (jsonControl.hasVideoData(JSONVideos, VIDEO_TITLE)) {
    alert(`There is overlapping video data. \n\n '${VIDEO_TITLE}'`);
    return;
  }

  const labellingInfoList = resultContainer.getLabellingData();

  const VideoData = new videoDataDTO();
  VideoData.setTitle(VIDEO_TITLE)
    .convertLabellingDatasoFrameList(VIDEO_FRAME_LENGTH, labellingInfoList);

  JSONFileObj.setVideos(VideoData);
  JSONFileObj.setCount();

  jsonControl.writeJSONFile(JSONFileObj.getDirPath(), JSONFileObj);

  initOnComplete();

  jsonFileContainer.initialize();
  jsonFileContainer.showVideoFiles(JSONFileObj.getVideos());
  videoFilesContainer.showCompletedVideoFilesCount(JSONFileObj.getVideos());
  videoFilesContainer.markCompletedVideoFiles([VIDEO_TITLE]);
});

const initOnComplete = () => {
  // 'main view'
  document.getElementById("video-title").innerText = "";
  document.getElementById("frame-index").innerText = 0;

  document.getElementById("main-view-image").hidden = false;
  document.getElementById("hidden-video").hidden = true;

  document.getElementById("video-duration").innerText = "";
  document.getElementById("video-fps").innerText = "";
  document.getElementById("video-frame-count").innerText = "";

  mainViewContainer.initialize();

  // directory list 'mouse over' event flag
  remote.getGlobal("sharedObject").COMPLETE_FLAG = true;

  // 'frame list'
  frameListContainer.initialize();

  // 'START, END frame-index section'
  document.getElementById("start-frame-input").innerText = 0;
  document.getElementById("end-frame-input").innerText = 0;
  inputFrameIndexContainer.reset();

  // 'labelling data'
  resultContainer.initialize();
}