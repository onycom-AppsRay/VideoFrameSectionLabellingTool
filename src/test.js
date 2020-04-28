import captureFrame from "capture-frame";

const assetURL = `${__dirname}/resources/sample/videos/[video]long_sample.mp4`;
const video_element = document.getElementById("test-video");
video_element.src = assetURL;
video_element.muted = "muted";

async function processArray(array) {
  // map array to promises
  const promises = array.map(delayedLog);
  // wait until all promises are resolved
  await Promise.all(promises);
  console.log('Done!');
}

(() => {

  for (let i = 0; i < 10; i++) {
    onloadedmetadata(i);
  }

  function onloadedmetadata (i) {
    console.log(i);
    video_element.addEventListener('seeked', (i) => {
      console.log(i);

      const buf = captureFrame(video_element)

      const image = document.createElement('img')
      image.src = window.URL.createObjectURL(new window.Blob([buf]))
      image.style.height = "30%";
      document.body.appendChild(image);

    });

    video_element.currentTime = i;
  }

  // video.addEventListener('loadedmetadata', onloadedmetadata);
  // function onloadedmetadata() {
  //   video.addEventListener('seeked', () => {
  //     const buf = captureFrame(video)

  //     const image = document.createElement('img')
  //     image.src = window.URL.createObjectURL(new window.Blob([buf]))
  //     image.style.height = "30%";
  //     document.body.appendChild(image)
  //   });

  //   video.currentTime = 3;
  // }
})();

const capture = () => {
  const video = document.querySelector("#test-video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext('2d').drawImage(video, 0, 0);

  document.body.appendChild(canvas);

  const dataUri = canvas.toDataURL('./image/' + "png");
  const data = dataUri.split(',')[1];

  return Buffer.from(data, 'base64');
}

const setImage = (buf) => {
  const image = document.createElement('img')
  image.src = window.URL.createObjectURL(new window.Blob([buf]))

  console.log(image.src);

  document.querySelector("body").appendChild(image);
}

function seekToTime(ts) {
  // try and avoid pauses after seeking
  video_element.pause();
  video_element.currentTime = ts; // if this is far enough away from current, it implies a "play" call as well...oddly. I mean seriously that is junk.
  // however if it close enough, then we need to call play manually
  // some shenanigans to try and work around this:
  var timer = setInterval(function () {
    if (video_element.paused && video_element.readyState == 4 || !video_element.paused) {
      video_element.play();
      clearInterval(timer);
    }
  }, 50);
}
