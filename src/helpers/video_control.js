import imageControl from "./image_control";

// playVideo(video, 5, GlobalVideoData.setFRAME_LIST, GlobalFrame.setLENGTH);

const createVideoTag = (path, playbackRate) => {
  const video = document.createElement("video");

  video.style.width = "100%";
  video.style.height = "100%";
  video.src = path;
  video.muted = "muted";
  video.playbackRate = playbackRate;

  return video;
}

const play = (videoElement, fps, setFrameLength) => {
  videoElement.play()
    .then(() => {
      let captureArr = [];
      let videoElementArr = [];
      let index = 0;

      (function loop() {
        if (videoElement.ended) {
          console.log("Finish video rendering");

          showFrameList(captureArr);

          // GlobalVideoDataSetFrameList(captureArr.length);
          setFrameLength(captureArr.length);

          return;
        } else {
          const imageData = captureVideo(videoElement, index++);
          captureArr.push(imageData);
        }

        setTimeout(() => {
          loop();

          showProgress(index, videoElement.ended);
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

const showProgress = (rate, flag) => {
  if (flag) {
    document.getElementById("progress-bar-container").hidden = true;
  } else {
    document.getElementById("progress-bar").style.width = `${rate}%`;
  }
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
  play
}
