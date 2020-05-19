import path from "path";

const initialize = () => {
  const mainViewImage = document.getElementById("main-view-image");

  mainViewImage.src = "";
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
  const mainViewImageContainer = document.getElementById("main-view-image-container");
  const mainViewImage = document.getElementById("main-view-image");

  mainViewImageContainer.style.width = "";
  mainViewImageContainer.style.height = "";
  mainViewImageContainer.style.left = "";
  mainViewImageContainer.style.top = "";
  mainViewImageContainer.style.transform = "";

  if (isWide) {
    mainViewImageContainer.style.top = "50%";
    mainViewImageContainer.style.transform = "translateY(-50%)";

    mainViewImage.style.width = "100%";
    mainViewImage.style.height = "auto";

    return;
  } 
  
  if (!isWide) {
    mainViewImageContainer.style.left = "50%";
    mainViewImageContainer.style.transform = "translateX(-50%)";
    mainViewImageContainer.style.height = "90%";

    mainViewImage.style.height = "100%";

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
