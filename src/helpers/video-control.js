
const frameListContainer = document.getElementById("frame-list-container");
const mainViewContainer = document.getElementById("main-view");

const clickVideoFile = (videoElement, frameCnt) => {
  console.log("play start");

  // initialize(mainViewContainer);
  document.getElementById("main-view-image").src = "";
  initialize(frameListContainer);

  const fps = Number.parseInt(frameCnt);
  const video = createVideoTag();
  const videoPath = getVideoPath(videoElement);
  video.setAttribute("src", videoPath);
  video.playbackRate = 3;

  if (video.videoHeight > video.videoWidth) {
    document.getElementById("main-view-image").style.height = "100%";
  } else {
    document.getElementById("main-view-image").style.width = "100%";
  }

  playVideo(video, fps, result => {
    result.forEach((imageData, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = imageData.width;
      canvas.height = imageData.height;

      canvas.getContext("2d").putImageData(imageData, 0, 0);

      const image = document.createElement("img");
      image.setAttribute("src", canvas.toDataURL("image/png", 0.1));

      if (imageData.width > imageData.height) {
        image.style.width = "100%";
      } else {
        image.style.height = "100%";
      }

      image.addEventListener("click", (event) => {
        showMainView(event.target);
      }, false);

      frameListContainer.appendChild(image);
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

const showMainView = element => {
  document.getElementById("main-view-image").src = element.src;
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

// 원본 사이즈를 유지하면서 저장
const captureVideo = (videoElement) => {
  const canvas = document.createElement("canvas");
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);

  return frame;
};

const drawStroked = (ctx, text, x, y) => {
  ctx.font = "20rem Sans-serif";
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

(() => {
  const path = "../sample2.mov";

  const video = document.createElement("video");
  video.setAttribute("src", path);
  video.muted = "muted";
  video.style.width = "100%";
  video.playbackRate = 5;

  // mainViewContainer.appendChild(video);

  document.getElementById("main-view-image").style.width = "100%";

  playVideo(video, 5, (result) => {
    result.forEach((value, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = value.width;
      canvas.height = value.height;

      const ctx = canvas.getContext("2d");
      ctx.putImageData(value, 0, 0);

      drawStroked(ctx, index, (canvas.width / 2), (canvas.height / 2));
      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.putImageData(frame, 0, 0);

      const img = document.createElement("img");
      img.src = canvas.toDataURL("image/jpeg", 0.1);
      img.className = "frame";
      img.style.width = "100%";
      img.addEventListener("click", (event) => {
        showMainView(event.target);
        event.target.style.border = "5px solid red";
      });
      img.addEventListener("mouseup", (event) => {
        // event.target.style.border = "";
        console.log(event.target);
        event.target.blur();
      });


      if (index == 0) {
          showMainView(img)
      }

      frameListContainer.appendChild(img);

      console.log(index);
    })
  });
})();


export default {
  clickVideoFile
}
