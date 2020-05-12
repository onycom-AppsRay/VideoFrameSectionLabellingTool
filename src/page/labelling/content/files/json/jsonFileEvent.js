import { remote } from "electron";

import globalFrame from "../../../../../model/global/globalFrame";
import globalVideoData from "../../../../../model/global/globalVideoData";

import videoCapture from "../../../../../helpers/video/videoCapture";
import jsonControl from "../../../../../helpers/json/json_control";

import mainViewContainer from "../../main/mainViewContainer";
import frameListContainer from "../../control1/frame/frameListContainer";
import labellingContainer from "../../control2/complete/labellingContainer";

const jsonFileContainer = document.getElementById("json-file-container");

let clickEventFlag = false;

jsonFileContainer.onclick = async (event) => {
  if (event.target.className == "json-video-file") {

    const title = event.target.dataset.title;

    if(!confirm(`'${title}' 의 데이터를 수정하시겠습니까?`)) {
      return;
    }

    document.getElementById("video-title").innerText = title;

    document.getElementById("complete").style.display = "none";
    document.getElementById("update").style.display = "";

    if (clickEventFlag) {
      alert("loading...");
      return false;
    } else {
      clickEventFlag = true;
    }

    mainViewContainer.initialize();
    frameListContainer.initialize();
    labellingContainer.initialize();

    // extract video frame list
    const videoDirectoryPath = remote.getGlobal("sharedObject").DIRECTORY.PATH;

    const completedFilePath = String.prototype.concat(videoDirectoryPath, "/", title);

    const video = mainViewContainer.getVideoTag(completedFilePath);
    mainViewContainer.setMainFrameRate(video);

    const loadedVideo = await videoCapture.loadVideo(completedFilePath);

    let videoWidth = loadedVideo.videoWidth;
    let videoHeight = loadedVideo.videoHeight;

    const frameList = await videoCapture.extractFrames(loadedVideo, 5);

    const GlobalVideoData = new globalVideoData();
    GlobalVideoData.setPATH(videoDirectoryPath);
    GlobalVideoData.setTITLE(title);

    const GlobalFrame = new globalFrame();
    GlobalFrame.setAT(0);
    GlobalFrame.setLENGTH(frameList.length);

    // show frame list
    frameList.forEach((frame, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = videoWidth;
      canvas.height = videoHeight;

      canvas.style.width = "100%";
      canvas.style.height = "auto";
      canvas.style.border = "2px solid lightgray";
      canvas.dataset.index = index;

      let img = new Image;
      img.onload = function () {
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        frameListContainer.drawStroked(ctx, index, (videoWidth / 2), (videoHeight / 2));
      };
      img.src = frame;

      document.getElementById("frame-list-container").appendChild(canvas);

      if (frameList.length == (index + 1)) {
        clickEventFlag = false;
      }

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

  }
}