import cv from "opencv4nodejs-prebuilt";

const extractFrames = (videoPath, resizeValue) => {
  const vCap = new cv.VideoCapture(videoPath);

  let done = false;

  let result = [];
  while (!done) {
    let frame = vCap.read();

    if (frame.empty) {
      done = true;
    } else {
      result.push(frame.resizeToMax(Number.parseInt(resizeValue)));
    }
  }

  return result;
}

const extractFrames2 = (videoPath, resizeRate) => {
  const vCap = new cv.VideoCapture(videoPath);

  let done = false;

  let result = [];
  while (!done) {
    let frame = vCap.read();

    if (frame.empty) {
      done = true;
    } else {
      result.push(frame.resizeToMax(resizeRate));
    }
  }

  return result;
}

const convertImageToMat = (img) => {
  const matRGBA = img.channels === 1
    ? img.cvtColor(cv.COLOR_GRAY2RGBA)
    : img.cvtColor(cv.COLOR_BGR2RGBA);

  const imgData = new ImageData(
    new Uint8ClampedArray(matRGBA.getData()),
    img.cols,
    img.rows
  );

  return imgData;
}

export default {
  extractFrames,
  extractFrames2,
  convertImageToMat
}
