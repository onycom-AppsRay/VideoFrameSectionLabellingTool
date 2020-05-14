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
    });

    it("should return files that directory path", () => {
      files = fs.readdirSync(dirPath);
      files.should.have.length(3);
    })

    it("should return file with the extension 'mp4', 'mov', 'avi'", () => {
      let extensions = [];

      files.forEach((file) => {
        const extension = path.extname(file);

        if(extension == ".avi" || extension == ".mov" || extension == ".mp4") {
          extensions.push(extension);
        }
      })

      extensions.should.containDeep([ '.avi', '.mov', '.mp4' ]);
    })
  });
});
