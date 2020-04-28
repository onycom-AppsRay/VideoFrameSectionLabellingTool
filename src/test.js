
const assetURL = `${__dirname}/resources/sample/videos/[video]long_sample.mp4`;

(async () => {
  const video = await loadVideo(assetURL);

  let videoWidth = video.videoWidth;
  let videoHeight = video.videoHeight;

  const frameList = await extractFrames(video);

  console.log(frameList);

  frameList.forEach((frame) => {
    const canvas = document.createElement("canvas");

    canvas.width = videoWidth;
    canvas.height = videoHeight;

    canvas.style.width = "30%";

    let img = new Image;
    
    img.onload = function () {
      canvas.getContext("2d").drawImage(img, 0, 0);
    };

    img.src = frame;

    document.body.appendChild(canvas);
  });
})();

async function loadVideo (videoUrl) {
  return new Promise(async (resolve) => {
    // fully download it first (no buffering):
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

async function extractFrames (video, fps = 1) {
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
      video.currentTime = currentTime;

      await new Promise(r => seekResolve = r);

      context.drawImage(video, 0, 0, w, h);
      let base64ImageData = canvas.toDataURL();
      frames.push(base64ImageData);

      currentTime += interval;
    }

    resolve(frames);
  });
};

async function extractFramesFromVideo(videoUrl, fps = 1) {
  return new Promise(async (resolve) => {

    // fully download it first (no buffering):
    let videoBlob = await fetch(videoUrl).then(r => r.blob());
    let videoObjectUrl = URL.createObjectURL(videoBlob);
    let video = document.createElement("video");

    let seekResolve;
    video.addEventListener('seeked', async function () {
      if (seekResolve) seekResolve();
    });

    video.src = videoObjectUrl;

    while ((video.duration === Infinity || isNaN(video.duration)) && video.readyState < 2) {
      await new Promise(r => setTimeout(r, 1000));
      video.currentTime = 10000000 * Math.random();
    }

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
      video.currentTime = currentTime;

      await new Promise(r => seekResolve = r);

      context.drawImage(video, 0, 0, w, h);
      let base64ImageData = canvas.toDataURL();
      frames.push(base64ImageData);

      currentTime += interval;
    }

    resolve(frames);
  });
};
