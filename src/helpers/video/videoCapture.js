
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

    console.log(duration);

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

      console.log(currentTime);
    }

    resolve(frames);
  });
};

export default {
  loadVideo,
  extractFrames
}
