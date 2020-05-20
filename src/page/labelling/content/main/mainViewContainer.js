import path from "path";

const initialize = () => {
  let mainViewImageContainer = document.getElementById("main-view-image-container");
  let mainViewImage = document.getElementById("main-view-image");

  mainViewImageContainer.style.top = "50%";
  mainViewImageContainer.style.transform = "translateY(-50%)";
  mainViewImageContainer.style.position = "absolute";
  mainViewImageContainer.style.height = "";

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
  mainViewImageContainer.style.left = "";
  mainViewImageContainer.style.top = "";
  mainViewImageContainer.style.transform = "";

  mainViewImage.style.width = "";
  mainViewImage.style.height = "";

  if (isWide) {
    mainViewImageContainer.style.top = "50%";
    mainViewImageContainer.style.transform = "translateY(-50%)";
    mainViewImageContainer.style.position = "absolute";

    mainViewImage.style.width = "100%";
    mainViewImage.style.height = "auto";

    return;
  } 
  
  if (!isWide) {
    mainViewImageContainer.style.position = "relative";
    mainViewImageContainer.style.height = "90%";

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
