
const frameListContainer = document.getElementById("frame-list-container");
const mainViewContainer = document.getElementById("main-view");

const play = (videoElement, frameCnt) => {
  console.log("play start");

  initialize(mainViewContainer);
  initialize(frameListContainer);

  const fps = Number.parseInt(frameCnt);
  const video = createVideoTag();
  const videoPath = getVideoPath(videoElement);
  video.setAttribute("src", videoPath);

  showMainView(video);

  capture(video, fps, result => {
    result.forEach((element, index) => {
      frameListContainer.appendChild(element);
    });
  });
}

const getVideoPath = element => {
  return JSON.parse(element.dataset.info).path;
}

const createVideoTag = () => {
  const video = document.createElement("video");
  video.style.width = "100%";
  video.style.height = "100%";

  return video;
}

const showMainView = videoElement => {
  videoElement.setAttribute("preload", "metadata");
  mainViewContainer.appendChild(videoElement);
}

// play
const capture = (videoElement, fps, callback) => {
  videoElement.play()
    .then(() => {
      let result = [];
      let index = 1;

      (function loop() {
        if (videoElement.ended) {
          console.log("Finish video rendering");

          return callback(result);;
        } else {
          result.push(videoToImage(videoElement, index++, 100, 60));
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

// capture
const videoToImage = (videoElement, index, width, height) => {
  const canvas = document.createElement("canvas");
  canvas.setAttribute("class", "video-frame");
  canvas.style.display = "block";
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  drawStroked(ctx, index, (canvas.width / 2), (canvas.height / 2));

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
  ctx.putImageData(frame, 0, 0);

  return canvas;
};

const drawStroked = (ctx, text, x, y) => {
  ctx.font = "20px Sans-serif";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
}

const initialize = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

export default {
  play
}
