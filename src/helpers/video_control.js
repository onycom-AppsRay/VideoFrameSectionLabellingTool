import tagControl from "./tag_control";
import imageControl from "./image_control";

import globalVideoData from "../model/globalVideoData";

const frameListContainer = document.getElementById("frame-list-container");
const mainViewImage = document.getElementById("main-view-image");
const progressBarContainer = document.getElementById("progress-bar-container");

const clickedVideoTitleTag = element => {
  initializeVideo(mainViewImage, frameListContainer, progressBarContainer);

  console.log("Play");

  const videoFilePath = element.dataset.path;
  const videoFileTitle = element.dataset.title;

  const GlobalVideoData = new globalVideoData();
  GlobalVideoData.setPATH(videoFilePath);
  GlobalVideoData.setTITLE(videoFileTitle);

  const video = createVideoTag(videoFilePath, 5);

  isWideVideoFrame(video, imageControl.setStyleOfMainViewImage, imageControl.setDefaultImage);

  playVideo(video, 5, GlobalVideoData);

  // TODO(yhpark):  Rendering next video
}

const initializeVideo = (mainView, frameList, progressBar) => {
  tagControl.initialize(frameList);

  mainView.src = "";
  progressBar.hidden = false;
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

const playVideo = (videoElement, fps, GlobalVideoData) => {
  videoElement.play()
    .then(() => {
      let captureArr = [];
      let index = 0;

      (function loop() {
        if (videoElement.ended) {
          console.log("Finish video rendering");

          showFrameList(captureArr);

          GlobalVideoData.setFRAME_LIST(captureArr.length);

          return;
        } else {
          const imageData = captureVideo(videoElement);
          captureArr.push(imageData);
        }

        setTimeout(() => {
          loop();

          showProgress(index++, videoElement.ended);
        }, 1000 / Number.parseInt(fps));
      })();
    })
    .catch(err => {
      throw err;
    });
}

const showFrameList = imageDataList => {
  const width = "100%";
  const height = "";

  imageDataList.forEach((imageData, index) => {
    const dataURL = imageControl.imageDataToImage(imageData, 0.1);

    imageControl.setImage(dataURL, index, width, height);
  });
}

const showProgress = (rate, flag) => {
  if (flag) {
    document.getElementById("progress-bar-container").hidden = true;
  } else {
    document.getElementById("progress-bar").style.width = `${rate}%`;
  }
}

const captureVideo = (videoElement) => {
  const canvas = document.createElement("canvas");

  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");

  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return frame;
};

const isWideVideoFrame = (videoElement, setStyleOfMainImage, setDefaultImage) => {
  videoElement.addEventListener("loadedmetadata", (event) => {
    let result = false;

    if (event.target.videoWidth > event.target.videoHeight) {
      result = true;
    }

    setStyleOfMainImage(result);
    setDefaultImage(result);
  });
};

export default {
  clickedVideoTitleTag,
  isWideVideoFrame
}
