const assert = require("assert");
const should = require("should");

const path = require("path");
const fs = require("fs");

describe("Directory open test", () => {
  describe("#getFileList", () => {
    let dirPath;
    let files = [];

    it("should return directory path", () => {
      dirPath = path.join(__dirname, "../../mock/videos");

      assert.equal(dirPath, "/Users/younghwanpark/Documents/git/VideoFrameSectionLabellingTool/mock/videos");
    });

    it("should return files that directory path", () => {
      files = fs.readdirSync(dirPath);
      files.should.have.length(5);

      // fs.readdir(dirPath, (err, files) => {
      //   if(err) done(err);


      //   files.forEach((file) => {
      //     console.log(path.extname(file));
      //   })

      //   done();
      // })
    })

    it("should return file with the extension 'mp4', 'mov', 'avi'", () => {
      files.forEach((file) => {
        // path.extname(file).should.exist([".mp4", ".mov", ".avi"]);
        // path.extname(file).should.exist(".mp4");

        console.log(path.extname(file));

        // should(path.extname(file)).be.oneOf([".mp4", ".mov", ".avi"]);
      })
    })
  });
});
