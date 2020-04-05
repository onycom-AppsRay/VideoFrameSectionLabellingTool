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
    .setName(content.name)
    .setCreateAt(content.createAt)
    .setCount(content.count)
    .setCriteria(content.criteria)
    .setVideos(content.videos);
}

const writeJSONFile = (path, jsonFile, videoData) => {
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

export default {
  getJSONFile,
  writeJSONFile,
  matchingVideoTitle,
}
