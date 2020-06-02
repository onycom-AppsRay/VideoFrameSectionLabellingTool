import path from "path";

import cv from "opencv4nodejs-prebuilt";

import videoCapture from "../../../src/helpers/video/videoCapture";
import frameListContainer from "../../../src/page/labelling/content/control1/frame/frameListContainer";

(() => {
  document.querySelector("#open-directory-page").style.display = "none";
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector("#labelling-page").style.display = "";

  const videoPath = path.join(__dirname, "../mock/videos/real/Abandon_AB_13_9_793.mp4");
  
  const video = document.querySelector("#hidden-video");
  video.src = videoPath;

  const videoCapture = new cv.VideoCapture(videoPath);

  console.log(videoCapture.get(cv.CAP_PROP_FPS));
  console.log(videoCapture.get(cv.CAP_PROP_FRAME_COUNT));
  
  let resizeRate = 0;
  
  video.onloadedmetadata = async () => {
    console.log(video.duration);
    console.log(video.videoHeight);
    console.log(video.videoWidth);

    console.log(video.metadata);
    
    /*
    videoCaptureList.forEach((captureImage, index) => {
      const imgData = videoCapture.convertImageToMat(captureImage);
      const canvasElement = frameListContainer.createCanvas(imgData, index);
  
      document.getElementById("frame-list-container").appendChild(canvasElement);
      // document.querySelector("#progressbar").style.width = `${index}%`;
      // document.querySelector("#progressbar").innerHTML = `${index}%`;

      console.log(index);
    })
    */
  }
})();