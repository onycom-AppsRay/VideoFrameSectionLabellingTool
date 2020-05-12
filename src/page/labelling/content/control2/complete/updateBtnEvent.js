import { remote } from "electron";

import jsonControl from "../../../../../helpers/json/json_control";
import tagControl from "../../../../../helpers/tag_control";

import videoDataDTO from "../../../../../model/dto/videoData";
import jsonFileDTO from "../../../../../model/dto/jsonFile";

import labellingContainer from "./labellingContainer";
import mainViewContainer from "../../main/mainViewContainer";
import frameListContainer from "../../control1/frame/frameListContainer";
import inputFrameIndexContainer from "../../control2/push/inputFrameIndexContainer";

document.getElementById("update").addEventListener("click", (event) => {

  const GLOBAL = remote.getGlobal("sharedObject");
  const VIDEO_TITLE = GLOBAL.VIDEO_DATA.TITLE;

  if(!confirm(`"${VIDEO_TITLE}" 의 수정을 완료하시겠습니까?`)) {
    return;
  }
  
  document.getElementById("complete").style.display = "";
  document.getElementById("update").style.display = "none";
  
  
  const JSON_PATH = GLOBAL.JSON_FILE.PATH;
  const VIDEO_FRAME_LENGTH = GLOBAL.FRAME.LENGTH;

  const readContent = jsonControl.getJSONFile(JSON_PATH);

  if (!readContent.result) {
    alert(readContent.content);
    return;
  }

  const JSONFile = new jsonFileDTO(readContent.content);
  const JSONVideos = JSONFile.getVideos();
  
  const deleteVideoIndex = JSONVideos.findIndex((video) => {
    return (video.title == VIDEO_TITLE);
  });

  const labellingInfoList = labellingContainer.getLabellingData();

  const VideoData = new videoDataDTO();
  VideoData.setTitle(VIDEO_TITLE)
    .convertLabellingDatasoFrameList(VIDEO_FRAME_LENGTH, labellingInfoList);

  JSONFile.updateVideo(deleteVideoIndex, VideoData);

  jsonControl.writeJSONFile(JSON_PATH, JSONFile);

  labellingContainer.initialize();
  mainViewContainer.initialize();
  frameListContainer.initialize();
  inputFrameIndexContainer.reset();

  tagControl.initMainViewFrame();
})