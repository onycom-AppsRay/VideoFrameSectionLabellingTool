import { remote } from "electron";

import globalFrame from "../../../../../model/global/globalFrame";
import globalVideoData from "../../../../../model/global/globalVideoData";

import videoCapture from "../../../../../helpers/video/videoCapture";
import jsonControl from "../../../../../helpers/json/json_control";

import mainViewContainer from "../../main/mainViewContainer";
import frameListContainer from "../../control1/frame/frameListContainer";
import labellingContainer from "../../control2/complete/labellingContainer";

const jsonFileContainer = document.getElementById("json-file-container");

jsonFileContainer.onclick = async (event) => {
  if (event.target.className == "json-video-file") {

    const title = event.target.dataset.title;

    if(!confirm(`'${title}' 의 데이터를 수정하시겠습니까?`)) {
      return;
    }

    document.getElementById("video-title").innerText = title;
    document.getElementById("complete").style.display = "none";
    document.getElementById("update").style.display = "";

    mainViewContainer.initialize();
    frameListContainer.initialize();
    labellingContainer.initialize();

    // extract video frame list
    const videoDirectoryPath = remote.getGlobal("sharedObject").DIRECTORY.PATH;

    const completedFilePath = String.prototype.concat(videoDirectoryPath, "/", title);

    const video = mainViewContainer.getVideoTag(completedFilePath);
    mainViewContainer.setMainFrameRate(video);

    const imgSize = document.querySelector(`img[id="main-view-image"]`).clientWidth;
    const videoSize = document.querySelector(`video[id="hidden-video"]`).clientWidth

    const resizeValue = (imgSize == 0) ? videoSize : imgSize;

    const videoCaptureList = videoCapture.extractFrames(completedFilePath, resizeValue);

    const GlobalVideoData = new globalVideoData();
    GlobalVideoData.setPATH(videoDirectoryPath);
    GlobalVideoData.setTITLE(title);

    const GlobalFrame = new globalFrame();
    GlobalFrame.setAT(0);
    GlobalFrame.setLENGTH(videoCaptureList.length);

    // show frame list
    videoCaptureList.forEach((captureImage, index) => {
      const imgData = videoCapture.convertImageToMat(captureImage);
      const canvasElement = frameListContainer.createCanvas(imgData, index);

      document.getElementById("frame-list-container").appendChild(canvasElement);
    });

    // show labelling data
    const jsonFilePath = remote.getGlobal("sharedObject").JSON_FILE.PATH;
    const result = jsonControl.getJSONFile(jsonFilePath);

    let labellingData;

    result.content.videos.some((video) => {
      if (video.title == title) {
        labellingData = video.frameList;

        return true;
      }
    })

    let before = 0;
    let start, end = 0;
    let flag = false;

    labellingData.forEach((value, index) => {
      if (value > 0 && before != value) {
        if (flag) {
          end = (index - 1);
          flag = false;

          labellingContainer.showLabellingData(start, end, String.fromCharCode(before + 64));
        }

        start = index;
        flag = true;
        before = value;

        return;
      }

      if (flag && before != value) {
        end = (index - 1);
        flag = false;

        labellingContainer.showLabellingData(start, end, String.fromCharCode(before + 64));
      }

      before = value;
    })

    remote.getGlobal("sharedObject").COMPLETE_FLAG = false;
  }
}

jsonFileContainer.onmouseover = () => {
  if (event.target.className == "json-video-file" && remote.getGlobal("sharedObject").COMPLETE_FLAG) {
    labellingContainer.initialize();

    const title = event.target.dataset.title;

    getCompletedLabellingData(remote.getGlobal("sharedObject").JSON_FILE.PATH, title);
  }
}

jsonFileContainer.onmouseleave = () => {
  if(remote.getGlobal("sharedObject").COMPLETE_FLAG) {
    labellingContainer.initialize();
  }
}

const getCompletedLabellingData = (JSONFILE_PATH, videoTitle) => {
  const JSONFILE_RESULT = jsonControl.getJSONFile(JSONFILE_PATH);

  let completedLabellingData;

  JSONFILE_RESULT.content.videos.some((video) => {
    if (video.title == videoTitle) {
      completedLabellingData = video.frameList;

      return true;
    }
  });

  let before = 0;
  let start, end = 0;
  let flag = false;

  completedLabellingData.forEach((value, index) => {
    if (value > 0 && before != value) {
      if (flag) {
        end = (index - 1);
        flag = false;

        labellingContainer.showLabellingData(start, end, String.fromCharCode(before + 64));
      }

      start = index;
      flag = true;
      before = value;

      return;
    }

    if (flag && before != value) {
      end = (index - 1);
      flag = false;

      labellingContainer.showLabellingData(start, end, String.fromCharCode(before + 64));
    }

    before = value;
  })
}