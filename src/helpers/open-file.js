/**
 *
 * @param {*} file - 'video file' element('path', 'name', 'size', 'extension', 'type');
 */

const mainViewContainer = document.getElementById("main-view");

(() => {
  const file = "/Volumes/Samsung_T5/onycom/[TestForte.AI] 로딩시간측정/[로딩시간측정] 데이터/[데이터] 화면영상녹화본/[화면영상녹화본] Original/[Original] 2020-02-06/20200206_135838.mp4"

  const video = document.createElement("video");
  video.setAttribute("src", file);
  video.setAttribute("preload", "metadata");

  console.log(video.videoHeight);
  console.log(video.videoWidth);
})();

const openFile = (element) => {
  initialize(mainViewContainer);

  const file = JSON.parse(element.dataset.info);
  const path = file.path;

  const video = document.createElement("video");
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

export default {
  openFile
}
