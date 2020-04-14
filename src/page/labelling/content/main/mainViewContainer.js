import imageControl from "../../../../helpers/image_control";

const initialize = () => {
  const mainViewImage = document.getElementById("main-view-image");

  mainViewImage.src = "";
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
  setMainFrameRate
}
