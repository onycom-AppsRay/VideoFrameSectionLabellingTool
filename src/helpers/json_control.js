import fs from "fs";

import jsonFile from "../model/jsonFile";

import validation from "../helpers/validation";

const getJSONFile = (path) => {
  const content = fs.readFileSync(path);
  const jsonContent = JSON.parse(content);

  if (!validation.isValidJSON(content)) {
    return;
  };

  if (!validation.validationValue(jsonContent)) {
    return;
  };

  return new jsonFile()
    .setName(jsonContent.name)
    .setCreateAt(jsonContent.createAt)
    .setCount(jsonContent.count)
    .setCriteria(jsonContent.criteria)
    .setVideos(jsonContent.videos);
}

const writeJSONFile = (path, content) => {
  fs.writeFile(path, JSON.stringify(content, " ", 2), err => {
    if (err) throw err;
    else {
      alert(`The JSON file was created in path \n\n '${path}'`);
    }
  });
}

const isWriteJSONFile = (path, jsonFile, videoData) => {
  const videoDataList = jsonFile.videos;

  if (hasVideoData(videoDataList, videoData)) {
    // TODO(yhpark): 라벨링 데이터 덮어쓰기
    alert("동일한 비디오에 대한 라벨링 데이터가 존재 합니다!");

    return false;
  } else {
    jsonFile.createAt = new Date();
    jsonFile.videos.push(videoData);

    fs.writeFileSync(path, JSON.stringify(jsonFile, " ", 2));

    return true;
  }
}

const hasVideoData = (videoDataList, videoData) => {
  const videoTitle = videoData.title;

  let result = false;

  result = videoDataList.some((videoData) => {
    if (videoData.title == videoTitle) {
      return true;
    }
  });

  return result;
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
  return new Date(Date.now()).toLocaleDateString().replace(/\//gi, "_").concat(`.json`);
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
  isWriteJSONFile,
  matchingVideoTitle,
  createFileNameWithCurrentTime,
  hasJSONFile
}
