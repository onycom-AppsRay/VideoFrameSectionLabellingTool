import { remote } from "electron";
import cv from "opencv4nodejs-prebuilt";

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
  const title = event.target.dataset.title;

  if (event.target.className == "video-file" && confirm(`'${title}' 에 대한 작업을 시작하시겠습니까?`)) {

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

    // let startTime = new Date().getTime();

    // 위에 'main-view' 를 초기화하는 코드들 때문에, 변경사항이 전달되지 않는다.
    console.log("client width: ", document.querySelector(`img[id="main-view-image"]`).clientWidth);

    const videoCaptureList = videoCapture.extractFrames(path, document.getElementById("hidden-video").clientWidth);
    // const videoCaptureList = videoCapture.extractFrames(path, document.querySelector(`img[id="main-view-image"]`).clientWidth);

    GlobalFrame.setLENGTH(videoCaptureList.length);

    videoCaptureList.forEach((captureImage, index) => {
      const imgData = videoCapture.convertImageToMat(captureImage);
      const canvasElement = frameListContainer.createCanvas(imgData, index);

      document.getElementById("frame-list-container").appendChild(canvasElement);
    })

    // let endTime = new Date().getTime();

    // console.log(endTime - startTime);
    remote.getGlobal("sharedObject").COMPLETE_FLAG = false;
  }
}

videoFilesContainer.onmouseover = () => {
  if (event.target.className == "video-file" && remote.getGlobal("sharedObject").COMPLETE_FLAG) {
    document.getElementById("main-view-image").hidden = true;
    document.getElementById("hidden-video").hidden = false;

    const videoTitle = event.target.dataset.title;
    const videoPath = event.target.dataset.path;

    const videoCapture = new cv.VideoCapture(videoPath);

    const hiddenVideoTag = document.getElementById("hidden-video");
    hiddenVideoTag.src = videoPath;

    hiddenVideoTag.onloadedmetadata = () => {
      document.getElementById("video-duration").innerText = hiddenVideoTag.duration;
    }

    document.getElementById("video-title").innerText = videoTitle;
    document.getElementById("video-fps").innerText = videoCapture.get(cv.CAP_PROP_FPS);
    document.getElementById("video-frame-count").innerText = videoCapture.get(cv.CAP_PROP_FRAME_COUNT);
  }
}

// videoFilesContainer.onmouseleave = () => {
//   document.getElementById("main-view-image").hidden = false;
//   document.getElementById("hidden-video").hidden = true;

//   document.getElementById("video-duration").innerText = "";
//   document.getElementById("video-title").innerText = "";
//   document.getElementById("video-fps").innerText = "";
//   document.getElementById("video-frame-count").innerText = "";
// }