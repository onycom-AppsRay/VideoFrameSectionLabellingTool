import { remote } from "electron";

const frameListContainer = document.getElementById("frame-list-container");
const mainViewImage = document.getElementById("main-view-image");

let GLOBAL_FRAME = remote.getGlobal("sharedObject").FRAME;

const imageDataToImage = (imageData, quality) => {
  const canvas = document.createElement("canvas");
  canvas.width = imageData.width;
  canvas.height = imageData.height;
  canvas.getContext("2d").putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/jpeg", quality);
}

const setImage = (dataUrl, index, width, height) => {
  const image = document.createElement("img");
  image.src = dataUrl;
  image.dataset.index = index;
  image.style.width = width;
  image.style.height = height;

  image.addEventListener("click", (event) => {
    const frameIndex = event.target.dataset.index;

    // Viewing main
    setMainViewImage(event.target);

    // Key board control
    GLOBAL_FRAME["AT"] = frameIndex;

    // Input frame index (start, end)
    const startFrameInput = document.getElementById("start-frame-input");
    const endFrameInput = document.getElementById("end-frame-input");

    startFrameInput.setAttribute("value", frameIndex);

  }, false);

  frameListContainer.appendChild(image);
}

const setMainViewImageSize = videoElement => {
  if (videoElement.videoHeight > videoElement.videoWidth) {
    mainViewImage.style.height = "100%";
  } else {
    mainViewImage.style.width = "100%";
  }
}

const setMainViewImage = (element) => {
  mainViewImage.src = element.src;
}

const drawStroked = (ctx, text, x, y) => {
  ctx.font = "20rem Sans-serif";
  ctx.strokeStyle = "black";
  ctx.textAlign = "center";
  ctx.lineWidth = 4;
  ctx.strokeText(text, x, y);
  ctx.fillStyle = "white";
  ctx.fillText(text, x, y);
}

export default {
  setMainViewImageSize,
  imageDataToImage,
  setImage,
  setMainViewImage,
  drawStroked
}
