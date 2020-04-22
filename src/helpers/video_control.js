import { remote } from "electron";
import cv from "opencv4nodejs";

import imageControl from "./image_control";
import jsonControl from "./json_control";

import jsonFileDTO from "../model/dto/jsonFile";

const videoCapture = (path) => {
  const vCap = new cv.VideoCapture(path);

  let result = [];
  let done = false;
  
  while(!done) {
    let frame = vCap.read();
    
    if(frame.empty) {
      remote.getGlobal("sharedObject").FRAME.LENGTH = result.length;

      vCap.reset();
      done = true;
    } else {
      result.push(frame);
    }
  }

  return result;
}

const getVideoTag = (path, playbackRate) => {
  const video = document.getElementById("hidden-video");

  video.style.width = "100%";
  video.style.height = "100%";
  video.src = path;
  video.muted = "muted";
  video.playbackRate = playbackRate;

  return video;
}

const createVideoTag = (path, playbackRate) => {
  const video = document.createElement("video");

  video.style.width = "100%";
  video.style.height = "100%";
  video.src = path;
  video.muted = "muted";
  video.playbackRate = playbackRate;

  return video;
}

const play = (videoElement, fps) => {
  videoElement.play()
    .then(() => {
      let captureArr = [];
      let index = 0;

      (function loop() {
        if (videoElement.ended) {
          console.log("Finish video rendering");

          showFrameList(captureArr);
          remote.getGlobal("sharedObject").FRAME.LENGTH = captureArr.length;

          return;
        } else {
          const imageData = captureVideo(videoElement, index++);
          captureArr.push(imageData);

        }

        setTimeout(() => {
          loop();
        }, 1000 / Number.parseInt(fps));
      })();
    })
    .catch(err => {
      throw err;
    });
}

const showFrameList = imageDataList => {
  const width = "100%";
  const height = "auto";

  imageDataList.forEach((imageData, index) => {
    const dataURL = imageControl.imageDataToImage(imageData, 0.1);

    imageControl.setImage(dataURL, index, width, height);
  });
}

const captureVideo = (videoElement, index) => {
  const canvas = document.createElement("canvas");

  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  imageControl.drawStroked(ctx, index, canvas.width / 2, canvas.height / 2);

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return frame;
};

const searchNextVideo = (nowVideoTitle) => {
  const globalDirectoryVideoInfoList = remote.getGlobal("sharedObject").DIRECTORY.VIDEOS;

  let directoryVideoTitleList = [];

  globalDirectoryVideoInfoList.forEach((videoInfo) => {
    directoryVideoTitleList.push(videoInfo.name);
  })

  const readContent = jsonControl.getJSONFile(remote.getGlobal("sharedObject").JSON_FILE.PATH);

  if (!readContent.result) {
    alert(readContent.content);
    return;
  }

  const JSONFile = new jsonFileDTO(readContent.content);
  const JSONVideoInfoList = JSONFile.getVideos();

  let jsonVideoTitleList = [];

  JSONVideoInfoList.forEach((videoInfo) => {
    jsonVideoTitleList.push(videoInfo.title);
  })

  let nowVideoIndex = directoryVideoTitleList.indexOf(nowVideoTitle);
  let length = directoryVideoTitleList.length;

  for (let i = (nowVideoIndex + 1); i < (length + nowVideoIndex); i++) {
    const nextTargetIndex = (i % length);
    const nextTarget = directoryVideoTitleList[nextTargetIndex];

    if (jsonVideoTitleList.indexOf(nextTarget) == -1) {
      return nextTarget;
    }
  }
}

export default {
  videoCapture,
  getVideoTag,
  createVideoTag,
  play,
  showFrameList,
  searchNextVideo
}
