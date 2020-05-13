const path = require("path");
const cv = require('opencv4nodejs');

describe("opencv4nodejs test", () => {
  describe("#getFrame", () => {
    let videoPath = path.join(__dirname, "../../mock/videos/sample2.mp4");

    it("should return frame", (done) => {
      const vCap = new cv.VideoCapture(videoPath);

      let frame = vCap.read();

      let index = 0;

      while (!frame.empty) {
        const matRGBA = frame.channels === 1
          ? imframe.cvtColor(cv.COLOR_GRAY2RGBA)
          : frame.cvtColor(cv.COLOR_BGR2RGBA);

        console.log(index++, " ", matRGBA.getData());

        frame = vCap.read();
      }

      done();
    })
  })
})