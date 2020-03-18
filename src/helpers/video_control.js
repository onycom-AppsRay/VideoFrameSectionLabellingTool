import tagControl from "./tag_control.js";

const frameListContainer = document.getElementById("frame-list-container");
const mainViewImage = document.getElementById("main-view-image");

const initialize = () => {
  tagControl.initialize(frameListContainer);
  mainViewImage.src = "";
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

const playVideo = (videoElement, fps, callback) => {
  videoElement.play()
    .then(() => {
      let result = [];

      (function loop() {
        if (videoElement.ended) {
          console.log("Finish video rendering");

          return callback(result);
        } else {
          const imageData = captureVideo(videoElement);
          result.push(imageData);
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

// image?
const captureVideo = (videoElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return frame;
};

export default {
  initialize,
  createVideoTag,
  playVideo
}
