import path from "path";
import cv from "opencv4nodejs-prebuilt";

const initialize = () => {
  const mainViewImage = document.getElementById("main-view-image");

  mainViewImage.src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic.png");

  mainViewImage.style.width = "";
  mainViewImage.style.height = "";
}

const getVideoTag = (path) => {
  const video = document.getElementById("hidden-video");

  video.src = path;
  video.muted = "muted";

  return video;
}

const setMainFrameRate = async (videoElement) => {
  let flag = false;

  videoElement.onloadedmetadata = (event) => {
    if (event.target.videoWidth > event.target.videoHeight) {
      flag = true;
    }

    setStyleOfMainViewImage(flag);
    setDefaultImage(flag);
  };
}

const setMainViewImage = (src) => {
  document.getElementById("main-view-image").src = src;
}

const setStyleOfMainViewImage = (isWide) => {
  let mainViewImageContainer = document.getElementById("main-view-image-container");
  let mainViewImage = document.getElementById("main-view-image");

  mainViewImageContainer.style.width = "";
  mainViewImageContainer.style.height = "";

  mainViewImage.style.width = "";
  mainViewImage.style.height = "";

  if (isWide) {
    mainViewImage.style.width = "100%";
    mainViewImage.style.height = "auto";

    return;
  } 
  
  if (!isWide) {
    mainViewImage.style.height = "100%";
    mainViewImage.style.width = "auto";

    return;
  }
}

const setDefaultImage = (isWide) => {
  if (isWide) {
    document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic.png");

    return;
  } 
  
  if (!isWide) {
    document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic_long.png");

    return;
  }
}

const showVideoInfo = (event) => {
  // 비디오 파일 미리보기를 위해서, 'video' tag 를 통한 초반 1Frame 노출.
  document.getElementById("main-view-image").hidden = true;
  document.getElementById("hidden-video").hidden = false;
  
  const fileName = event.target.dataset.title;
  const filePath = event.target.dataset.path;

  const hiddenVideoTag = document.getElementById("hidden-video");
  hiddenVideoTag.src = filePath;
  hiddenVideoTag.onloadedmetadata = () => {
    document.getElementById("video-duration").innerText = hiddenVideoTag.duration;
  }
  
  const videoCapture = new cv.VideoCapture(filePath);

  document.getElementById("video-title").innerText = fileName;
  document.getElementById("video-fps").innerText = videoCapture.get(cv.CAP_PROP_FPS);
  document.getElementById("video-frame-count").innerText = videoCapture.get(cv.CAP_PROP_FRAME_COUNT);
}

const initVideoInfo = () => {
  document.getElementById("main-view-image").hidden = false;
  document.getElementById("hidden-video").hidden = true;

  document.getElementById("video-duration").innerText = "";
  document.getElementById("video-title").innerText = "";
  document.getElementById("video-fps").innerText = "";
  document.getElementById("video-frame-count").innerText = "";
}

export default {
  initialize,
  getVideoTag,
  setMainFrameRate,
  setMainViewImage,
  showVideoInfo,
  initVideoInfo
}
