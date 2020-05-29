import path from "path";

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

export default {
  initialize,
  getVideoTag,
  setMainFrameRate,
  setMainViewImage
}
