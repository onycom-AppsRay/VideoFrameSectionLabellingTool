/**
 *
 * @param {*} file - 'video file' element('path', 'name', 'size', 'extension', 'type');
 */

const mainViewContainer = document.getElementById("main-view");
const frameListContainer = document.getElementById("frame-list-container");

const openFile = (element) => {
  initialize(mainViewContainer);
  initialize(frameListContainer);

  const file = JSON.parse(element.dataset.info);
  const path = file.path;

  const video = document.createElement("video");
  video.style.width = "100%";
  video.style.height = "100%";
  video.setAttribute("src", path);
  video.setAttribute("preload", "metadata");

  mainViewContainer.appendChild(video);

  captureVideo(video);
}

/**
 * @param {*} element, 'video-files' document
 */
const initialize = (element) => {
  while (element.hasChildNodes()) {
    element.removeChild(element.firstChild);
  }
}

const captureVideo = (videoElement) => {
  videoElement.play()
    .then(() => {
      let index = 1;
      (function loop() {
        if (videoElement.ended) {
          return;
        } else {
          const canvas = document.createElement("canvas");
          canvas.setAttribute("class", "video-frame");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;

          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
          drawStroked(ctx, index++, (canvas.width/2), (canvas.height/2));

          const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
          ctx.putImageData(frame, 0, 0);

          document.getElementById("frame-list-container").appendChild(canvas);
        };

        setTimeout(function () {
          loop();
        }, 1000 / 5);
      })();
    })
    .catch((err) => {
      console.log(err);
    });
}

function drawStroked(ctx, text, x, y) {
  ctx.font = '10rem Sans-serif';
  ctx.strokeStyle = 'black';
  ctx.textAlign = "center";
  ctx.lineWidth = 5;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
}

export default {
  openFile
}
