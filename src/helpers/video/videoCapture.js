import cv from "opencv4nodejs-prebuilt";

const extractFrames = (videoPath) => {
  const vCap = new cv.VideoCapture(videoPath);

  let done = false;

  let result = [];
  while (!done) {
    let frame = vCap.read();

    if (frame.empty) {
      done = true;
    } else {
      result.push(frame);
    }
  }

  return result;
}

const convertImageToMat = (img) => {
  const matRGBA = img.channels === 1
    ? img.cvtColor(cv.COLOR_GRAY2RGBA)
    : img.cvtColor(cv.COLOR_BGR2RGBA);

  // create new ImageData from raw mat data
  const imgData = new ImageData(
    new Uint8ClampedArray(matRGBA.getData()),
    img.cols,
    img.rows
  );

  return imgData;
}

export default {
  extractFrames,
  convertImageToMat
}
