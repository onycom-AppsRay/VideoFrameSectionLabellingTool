import { remote } from "electron";

import jsonControl from "../../../../../helpers/json_control";

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

  labellingContainer.initialize();
  mainViewContainer.initialize();
  frameListContainer.initialize();
  inputFrameIndexContainer.reset();

  jsonFileContainer.initialize();
  jsonFileContainer.showVideoFiles(JSONFile.getVideos());
  videoFilesContainer.showCompletedVideoFilesCount(JSONFile.getVideos());
  videoFilesContainer.markCompletedVideoFiles([VIDEO_TITLE]);
})