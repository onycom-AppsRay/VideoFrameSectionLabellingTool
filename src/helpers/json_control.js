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

  return new jsonFile(jsonContent);
}

const writeJSONFile = (path, jsonFile, videoData) => {
  const videoDataList = jsonFile.videos;

  if (hasVideoData(videoDataList, videoData)) {
    // TODO(yhpark): 라벨링 데이터 덮어쓰기
    alert("동일한 비디오에 대한 라벨링 데이터가 존재 합니다!");

    return;
  }

  jsonFile.createAt = new Date();
  jsonFile.videos.push(videoData);

  fs.writeFileSync(path, JSON.stringify(jsonFile, " ", 2));
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

const markingDirectoryVideoFile = (dirVideoFilesContainer, jsonVideoFilesContainer) => {
  if (!hasVideoFiles(dirVideoFilesContainer) ||
    !hasVideoFiles(jsonVideoFilesContainer)) return;

  const dirVideoTitleTagList = dirVideoFilesContainer.children;
  const jsonVideoTitleTagList = jsonVideoFilesContainer.children;

  let dirVideoTitleList = [];
  let jsonVideoTitleList = [];

  for (let i = 0; i < dirVideoTitleTagList.length; i++) {
    const childTag = dirVideoTitleTagList.item(i);
    const childTagContent = childTag.innerHTML;

    if (childTagContent != "" && childTagContent.match(/\.(mp4|mov)$/) != null) {
      dirVideoTitleList.push(childTagContent);
    }
  }

  for (let i = 0; i < jsonVideoTitleTagList.length; i++) {
    const childTag = jsonVideoTitleTagList.item(i);
    const childTagContent = childTag.innerHTML;

    if (childTagContent != "" && childTagContent.match(/\.(mp4|mov)$/) != null) {
      jsonVideoTitleList.push(childTagContent);
    }
  }

  const matchedVideoList = matchingVideoTitle(dirVideoTitleList, jsonVideoTitleList);

  markingVideoTitle(matchedVideoList);
}

const hasVideoFiles = (element) => {
  return element.children.length > 0 ? true : false;
};

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

const markingVideoTitle = (matchedVideoList) => {
  matchedVideoList.forEach((videoTitle) => {
    document.getElementById(videoTitle).style.textDecoration = "line-through";
  });
};

export default {
  getJSONFile,
  writeJSONFile,
  markingDirectoryVideoFile,
}
