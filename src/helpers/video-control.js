// import cv from "opencv4nodejs";
import cv from "opencv";
import path from "path";
import { fs } from "fs";

const mainViewContainer = document.getElementById("main-view");
const frameListContainer = document.getElementById("frame-list-container");

const play = (element) => {
  console.log("play start");

  initialize(mainViewContainer);
  initialize(frameListContainer);

  const file = JSON.parse(element.dataset.info);
  const path = file.path;

  const video = document.createElement("video");
  video.setAttribute("src", path);
  video.style.width = "100%";
  video.style.height = "100%";
  video.setAttribute("preload", "metadata");

  mainViewContainer.appendChild(video);

  capture(video, 5, (result) => {
    result.forEach((element) => {
      const canvas = videoToImage(element);

      frameListContainer.appendChild(canvas);
    });
  });
}

const capture = (videoElement, fps, callback) => {
  videoElement.play()
    .then(() => {
      let result = [];

      (function loop() {
        if (videoElement.ended) {
          console.log("Finish video rendering");

          return callback(result);;
        } else {
          result.push(videoElement);
        }

        setTimeout(() => {
          loop();
        }, 1000 / Number.parseInt(fps));
      })();
    });
}

const videoToImage = (video) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("class", "video-frame");
  canvas.width = 100;
  canvas.height = 60;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.putImageData(frame, 0, 0);

  return canvas;
};

const renderImage = (image) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("class", "video-frame");
  canvas.width = 100;
  canvas.height = 60;

  const ctx = canvas.getContext("2d");

  ctx.putImageData(image, 0, 0);

  return canvas;
}

const drawStroked = (ctx, text, x, y) => {
  ctx.font = '1.3rem Sans-serif';
  ctx.strokeStyle = 'black';
  ctx.textAlign = "center";
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
}

const initialize = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

export default {
  play,
  // capture
}
