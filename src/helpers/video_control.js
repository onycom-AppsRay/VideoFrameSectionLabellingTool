import { remote } from "electron";
import cv from "opencv4nodejs";

import imageControl from "./image_control";
import jsonControl from "./json_control";

import jsonFileDTO from "../model/dto/jsonFile";

const videoCapture = (path) => {
  // open video capture
  const vCap = new cv.VideoCapture(path);

  const frame = vCap.read();

  const matRGBA = frame.channels === 1
    ? frame.cvtColor(cv.COLOR_GRAY2RGBA)
    : frame.cvtColor(cv.COLOR_BGR2RGBA);

  // create new ImageData from raw mat data
  const imgData = new ImageData(
    new Uint8ClampedArray(matRGBA.getData()),
    frame.cols,
    frame.rows
  );

  // set canvas dimensions
  const canvas = document.createElement('canvas');
  canvas.height = frame.cols;
  canvas.width = frame.rows;

  // set image data
  const ctx = canvas.getContext('2d');
  ctx.putImageData(imgData, 0, 0);

  document.getElementById("main-view-image-container").appendChild(canvas);
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

const getFrame = (path) => {
  try {
    var process = new ffmpeg(path);
    process.then(function (video) {
      // Callback mode
      video.fnExtractFrameToJPG(`/Users/parkyounghwan/git/onycom/VideoFrameSectionLabellingTool/mock`, {
        frame_rate: 1,
        number: 5,
        file_name: 'frame'
      }, function (error, files) {
        alert(error);
        if (!error) {
          alert('Frames: ' + files);
        }
      });
    }, function (err) {
      alert('Error: ' + err);
    });

  } catch (e) {
    alert(e.code);
    alert(e.msg);
  }

};

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
  getFrame,
  play,
  showFrameList,
  searchNextVideo
}
