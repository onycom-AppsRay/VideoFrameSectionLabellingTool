import cv from "opencv4nodejs-prebuilt";

async function loadVideo(videoUrl) {
  return new Promise(async (resolve) => {
    let videoBlob = await fetch(videoUrl).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    video.src = videoObjectUrl;

    while ((video.duration === Infinity || isNaN(video.duration)) && video.readyState < 2) {
      await new Promise(r => setTimeout(r, 1000));
      video.currentTime = 10000000 * Math.random();
    }

    resolve(video);
  });
};

async function extractFrames(video, fps = 1) {
  return new Promise(async (resolve) => {
    let seekResolve;
    video.addEventListener('seeked', async function () {
      if (seekResolve) seekResolve();
    });

    let duration = video.duration;

    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    let [w, h] = [video.videoWidth, video.videoHeight]
    canvas.width = w;
    canvas.height = h;

    let frames = [];
    let interval = 1 / fps;
    let currentTime = 0;

    while (currentTime < duration) {
      document.querySelector("#frames-progress-bar > div").style.width = `${(100 * (currentTime / duration))}%`;

      video.currentTime = currentTime;

      await new Promise(r => seekResolve = r);

      context.drawImage(video, 0, 0, w, h);
      let base64ImageData = canvas.toDataURL();
      frames.push(base64ImageData);

      currentTime += interval;
    }
    document.querySelector("#frames-progress-bar > div").style.width = `0%`;

    resolve(frames);
  });
};

const extractFrames2 = (videoPath) => {
  const vCap = new cv.VideoCapture(videoPath);

  let done = false;

  let result = [];
  while (!done) {
    let frame = vCap.read();

    if (frame.empty) {
      done = true;
    } else {
      result.push(frame);
    }
  }

  return result;
}

const convertImageToMat = (img) => {
  const matRGBA = img.channels === 1
    ? img.cvtColor(cv.COLOR_GRAY2RGBA)
    : img.cvtColor(cv.COLOR_BGR2RGBA);

  // create new ImageData from raw mat data
  const imgData = new ImageData(
    new Uint8ClampedArray(matRGBA.getData()),
    img.cols,
    img.rows
  );

  return imgData;
}

export default {
  loadVideo,
  extractFrames,
  extractFrames2,
  convertImageToMat
}
