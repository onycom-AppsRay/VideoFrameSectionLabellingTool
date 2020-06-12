import fs from "fs";
import path from "path";

import videoCapture from "../../../../src/helpers/video/videoCapture";

import frameListContainer from "../../../../src/page/labelling/content/control1/frame/frameListContainer";

const displayControl = () => {
  document.querySelector("#open-directory-page").style.display = "none";
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector("#labelling-page").style.display = "";
}

const showFrameList = () => {
  displayControl();

  const resources = fs.readFileSync(path.join(__dirname, "../test/helpers/resources.json"));
  const videoMockPath = JSON.parse(resources).video;
  const wideMOVVideoPath = path.join(__dirname, videoMockPath.wide_mov_video_mock);

  const resizingRate = document.getElementById("main-view-image").clientWidth;

  const frameList = videoCapture.extractFrames(wideMOVVideoPath, resizingRate);

  frameListContainer.showFrameList(frameList);
}

export default {
  showFrameList
}