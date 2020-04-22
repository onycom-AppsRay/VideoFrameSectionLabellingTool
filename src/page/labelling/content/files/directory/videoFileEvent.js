import { remote } from "electron";

import videoControl from "../../../../../helpers/video_control";
import jsonControl from "../../../../../helpers/json_control";

import mainViewContainer from "../../main/mainViewContainer";
import frameListContainer from "../../control1/frame/frameListContainer";
import overlayContainer from "../../../../overlay/overlayContainer";

import globalVideoData from "../../../../../model/global/globalVideoData";
import globalFrame from "../../../../../model/global/globalFrame";
import jsonFileDTO from "../../../../../model/dto/jsonFile";

const videoFilesContainer = document.getElementById("video-files-container");

videoFilesContainer.onclick = (event) => {
  if (event.target.className == "video-file") {
    const path = event.target.dataset.path;
    const title = event.target.dataset.title;

    videoControl.videoCapture(path);
    // const jsonFilePath = remote.getGlobal("sharedObject").JSON_FILE.PATH;
    // const result = jsonControl.getJSONFile(jsonFilePath);

    // if(!result.result) {
    //   alert("Error json file load");
    //   return;
    // }

    // const JSONContent = new jsonFileDTO(result.content);
    // const JSONVideos = JSONContent.getVideos();

    // if(JSONVideos.length > 0) {
    //   if(jsonControl.hasVideoData(JSONVideos, title)){
    //     alert("동일한 비디오에 대한 데이터가 존재 합니다.");
    //     return;
    //   }
    // }

    // mainViewContainer.initialize();
    // frameListContainer.initialize();
    // overlayContainer.initialize();

    // const GlobalVideoData = new globalVideoData();
    // GlobalVideoData.setPATH(path);
    // GlobalVideoData.setTITLE(title);

    // const GlobalFrame = new globalFrame();
    // GlobalFrame.setAT(0);

    // const playBackRate = 5;
    // const video = videoControl.getVideoTag(path, playBackRate);

    // mainViewContainer.setMainFrameRate(video);

    // const fps = 5;
    // videoControl.play(video, fps);
    // overlayContainer.showProgress();
  }
}

