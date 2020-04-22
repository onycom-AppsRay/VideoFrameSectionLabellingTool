import imageControl from "../../../../helpers/image_control";

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

    imageControl.setStyleOfMainViewImage(flag);
    imageControl.setDefaultImage(flag);
  };
}

export default {
  initialize,
  getVideoTag,
  setMainFrameRate
}
