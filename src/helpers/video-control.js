import cv from "opencv4nodejs";
import path from "path";

const capture = (filePath) => {
  const videoCapture = new cv.VideoCapture(path.resolve(filePath));
  let frame = videoCapture.read();

  while(!frame.empty) {
    frame = frame.resizeToMax(100);
    console.log(frame);

    frame = videoCapture.read();
  }
}

export default {
  capture
}
