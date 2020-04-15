import { remote } from "electron";

import imageControl from "./image_control";

const createVideoTag = (path, playbackRate) => {
  const video = document.getElementById("hidden-video");

  video.style.width = "100%";
  video.style.height = "100%";
  video.src = path;
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

export default {
  createVideoTag,
  play,
}
