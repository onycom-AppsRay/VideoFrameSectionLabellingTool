import { remote } from "electron";

import jsonControl from "../../../../../helpers/json/json_control";

import videoDataDTO from "../../../../../model/dto/videoData";
import jsonFileDTO from "../../../../../model/dto/jsonFile";

import labellingContainer from "./labellingContainer";
import mainViewContainer from "../../main/mainViewContainer";
import frameListContainer from "../../control1/frame/frameListContainer";
import inputFrameIndexContainer from "../../control2/push/inputFrameIndexContainer";
import jsonFileContainer from "../../files/json/jsonFileContainer";
import videoFilesContainer from "../../files/directory/videoFilesContainer";

const COMPLETE_BTN = document.getElementById("complete");

COMPLETE_BTN.addEventListener("click", (event) => {

  if (!confirm("작업을 완료하시겠습니까?")) {
    return;
  }
  
  const GLOBAL = remote.getGlobal("sharedObject");

  const JSON_PATH = GLOBAL.JSON_FILE.PATH;
  const VIDEO_TITLE = GLOBAL.VIDEO_DATA.TITLE;
  const VIDEO_FRAME_LENGTH = GLOBAL.FRAME.LENGTH;

  const readContent = jsonControl.getJSONFile(JSON_PATH);

  if (!readContent.result) {
    alert(readContent.content);
    return;
  }

  const JSONFile = new jsonFileDTO(readContent.content);
  const JSONVideos = JSONFile.getVideos();

  if (jsonControl.hasVideoData(JSONVideos, VIDEO_TITLE)) {
    alert(`There is overlapping video data. \n\n '${VIDEO_TITLE}'`);
    return;
  }

  const labellingInfoList = labellingContainer.getLabellingData();

  const VideoData = new videoDataDTO();
  VideoData.setTitle(VIDEO_TITLE)
    .convertLabellingDatasoFrameList(VIDEO_FRAME_LENGTH, labellingInfoList);

  JSONFile.setVideos(VideoData)
    .setCount();

  jsonControl.writeJSONFile(JSON_PATH, JSONFile);

  initOnComplete();

  jsonFileContainer.initialize();
  jsonFileContainer.showVideoFiles(JSONFile.getVideos());
  videoFilesContainer.showCompletedVideoFilesCount(JSONFile.getVideos());
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
  labellingContainer.initialize();
}