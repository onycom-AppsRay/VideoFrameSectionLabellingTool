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

  mainViewImageContainer.setAttribute("style", `height: ""; left: ""; top: ""; transform: ""`);

  if (isWide) {
    mainViewImageContainer.setAttribute("style", `top: 50%; transform: translateY(-50%);`);

    mainViewImage.setAttribute("style", `width: 100%; height: auto;`);
  } else {

    mainViewImageContainer.setAttribute("style", `left: 50%; transform: translateX(-50%); height: 95%`);

    mainViewImage.setAttribute("style", `width: auto; height: 100%;`);
  }
}

const setDefaultImage = (isWide) => {
  if (isWide) {
    document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic.png");
  } else {
    document.querySelector("#main-view-image").src = path.join("file://", __dirname, "../resources/images/onycom_ci_basic_long.png");
  }
}

export default {
  initialize,
  getVideoTag,
  setMainFrameRate,
  setMainViewImage
}
