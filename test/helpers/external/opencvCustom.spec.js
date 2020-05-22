const path = require("path");

const cv = require("opencv4nodejs-prebuilt");


describe("OPENCV CUSTOM TEST", () => {
  describe("#loadVideo", () => {

    let sampleVideoPath;

    before(() => {
      sampleVideoPath = path.join(__dirname, "../mock/videos/sample2.mp4");

      console.log(sampleVideoPath);
    })
  })
})
