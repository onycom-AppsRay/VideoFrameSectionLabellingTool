import path from "path";

import cv from "opencv4nodejs";

const frameListContainer = document.getElementById("frame-list-container");
const mainViewImageContainer = document.getElementById("main-view-image-container");
const mainViewImage = document.getElementById("main-view-image");

const setFrameToCanvas = (frame, index) => {
  const matRGBA = frame.cvtColor(cv.COLOR_BGR2RGBA);
  
  const imgData = new ImageData(
    new Uint8ClampedArray(matRGBA.getData()),
    frame.cols,
    frame.rows
  );
  
  // set canvas dimensions
  const canvas = document.createElement('canvas');
  canvas.height = frame.rows;
  canvas.width = frame.cols;

  canvas.setAttribute("style", "width: 100%; height: auto; border: 2px solid lightgray");
  canvas.dataset.index = index;
  
  // set image data
  const ctx = canvas.getContext('2d');

  ctx.putImageData(imgData, 0, 0);
  drawStroked(ctx, index, (frame.cols / 2), (frame.rows / 2));

  return canvas;
}

const imageDataToImage = (imageData, quality) => {
  const canvas = document.createElement("canvas");

  canvas.width = imageData.width;
  canvas.height = imageData.height;

  const ctx = canvas.getContext("2d");

  ctx.putImageData(imageData, 0, 0);

  return canvas.toDataURL("image/jpeg", quality);
}

const setImage = (dataUrl, index, width, height) => {
  const image = document.createElement("img");
  image.src = dataUrl;
  image.dataset.index = index;
  image.style.width = width;
  image.style.height = height;
  image.style.border = "0.3rem solid lightgray";

  frameListContainer.appendChild(image);
}

const setMainViewImage = (src) => {
  mainViewImage.src = src;
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

const setStyleOfMainViewImage = (isWide) => {
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
  imageDataToImage,
  setImage,
  setMainViewImage,
  drawStroked,
  setStyleOfMainViewImage,
  setDefaultImage,
  setFrameToCanvas
}
