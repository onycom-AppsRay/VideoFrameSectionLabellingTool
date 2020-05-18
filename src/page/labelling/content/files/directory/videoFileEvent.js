import { remote } from "electron";

import videoCapture from "../../../../../helpers/video/videoCapture";

import jsonControl from "../../../../../helpers/json/json_control";

import mainViewContainer from "../../main/mainViewContainer";
import frameListContainer from "../../control1/frame/frameListContainer";
import labellingContainer from "../../control2/complete/labellingContainer";

import globalVideoData from "../../../../../model/global/globalVideoData";
import globalFrame from "../../../../../model/global/globalFrame";
import jsonFileDTO from "../../../../../model/dto/jsonFile";

const videoFilesContainer = document.getElementById("video-files-container");

videoFilesContainer.onclick = async (event) => {
  if (event.target.className == "video-file") {

    const title = event.target.dataset.title;

    document.getElementById("video-title").innerText = title;

    const path = event.target.dataset.path;

    const jsonFilePath = remote.getGlobal("sharedObject").JSON_FILE.PATH;
    const result = jsonControl.getJSONFile(jsonFilePath);

    if (!result.result) {
      alert("Error json file load");
      return;
    }

    const JSONContent = new jsonFileDTO(result.content);
    const JSONVideos = JSONContent.getVideos();

    if (JSONVideos.length > 0) {
      if (jsonControl.hasVideoData(JSONVideos, title)) {
        alert("동일한 비디오에 대한 데이터가 존재 합니다.");
        return;
      }
    }

    mainViewContainer.initialize();
    frameListContainer.initialize();
    labellingContainer.initialize();

    const GlobalVideoData = new globalVideoData();
    GlobalVideoData.setPATH(path);
    GlobalVideoData.setTITLE(title);

    const GlobalFrame = new globalFrame();
    GlobalFrame.setAT(0);

    const video = mainViewContainer.getVideoTag(path);

    mainViewContainer.setMainFrameRate(video);

    const videoCaptureList = videoCapture.extractFrames2(path);

    GlobalFrame.setLENGTH(videoCaptureList.length);

    videoCaptureList.forEach((captureImage, index) => {
      const imgData = videoCapture.convertImageToMat(captureImage);
      const canvasElement = frameListContainer.createCanvas2(imgData, index);

      document.getElementById("frame-list-container").appendChild(canvasElement);
    })
  }
}

const getFrames = (videoPath) => {
  const videoCaptureList = videoCapture.extractFrames2(videoPath);

  GlobalFrame.setLENGTH(videoCaptureList.length);

  videoCaptureList.forEach((captureImage, index) => {
    const imgData = videoCapture.convertImageToMat(captureImage);
    const canvasElement = frameListContainer.createCanvas2(imgData, index);

    document.getElementById("frame-list-container").appendChild(canvasElement);
  })
}