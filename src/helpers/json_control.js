import fs from "fs";

import validation from "../helpers/validation";

const getJSONFile = (path) => {
  const content = fs.readFileSync(path);

  let result = {
    "result": false,
    "content": ""
  }

  if (!validation.isJSON(content)) {
    result.content = "Not JSON";
    return result;
  };

  const jsonContent = JSON.parse(content);

  if (!validation.checkJSONValueType(jsonContent)) {
    result.content = "Not valid JSON";
    return result;
  };

  result.result = true;
  result.content = jsonContent;

  return result;
}


const writeJSONFile = (path, content) => {
  fs.writeFile(path, JSON.stringify(content, " ", 2), err => {
    if (err) throw err;
  });
}

const hasVideoData = (videoDataList, videoTitle) => {
  return Array.prototype.some.call(videoDataList, (videoData) => {
    if (videoData.title == videoTitle) {
      return true;
    }
  });
}

const matchingVideoTitle = (directoryVideos, jsonVideos) => {
  let matchedVideoList = [];

  directoryVideos.forEach((dirVideo) => {
    jsonVideos.some((jsonVideo) => {
      if (dirVideo == jsonVideo) {
        matchedVideoList.push(jsonVideo);

        return;
      }
    });
  });

  return matchedVideoList;
};

const createFileNameWithCurrentTime = () => {
  const toDay = new Date();

  Date.prototype.yyyymmdd = (function () {
    const yyyy = this.getFullYear().toString();
    const mm = (this.getMonth() + 1).toString();
    const dd = this.getDate().toString();

    return yyyy + (mm[1] ? mm : "0" + mm[0]) + (dd[1] ? dd : "0" + dd[0]);
  })

  Date.prototype.hhmmss = (function () {
    const hh = this.getHours().toString();
    const mm = this.getMinutes().toString();
    const ss = this.getSeconds().toString();

    return (hh[1] ? hh : "0" + hh[0]) + (mm[1] ? mm : "0" + mm[0]) + (ss[1] ? ss : "0" + ss[0]);
  })

  return toDay.yyyymmdd() + toDay.hhmmss() + ".json";
}

const hasJSONFile = (path, fileName) => {
  let flag = true;

  const dirList = fs.readdirSync(path);

  dirList.some((file) => {
    if(file == fileName) {
      flag = false;

      return;
    }
  })

  return flag;
}

export default {
  getJSONFile,
  writeJSONFile,
  matchingVideoTitle,
  createFileNameWithCurrentTime,
  hasJSONFile,
  hasVideoData
}
