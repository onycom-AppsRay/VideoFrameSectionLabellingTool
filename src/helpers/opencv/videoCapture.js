import cv from "opencv4nodejs";

export default class {
  constructor(path) {
    this.videoCapture = new cv.VideoCapture(path);
    this.frameList = [];
  }

  capture() {
    let done = false;

    while(!done) {
      let frame = this.videoCapture.read();

      if(frame.empty) {
        this.videoCapture.reset();

        done = true;
      }else {
        this.frameList.push(frame);
      }
    }
  }

  setFrameToImageData(frame) {
    const matRGBA = frame.cvtColor(cv.COLOR_BGR2RGBA);

    const imageData = new ImageData(
      new Uint8ClampedArray(matRGBA.getData()),
      frame.cols,
      frame.rows
    );

    return imageData;
  }

  getFrameList() {
    return this.frameList;
  }
}