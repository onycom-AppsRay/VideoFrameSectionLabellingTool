import fs from "fs";
import path from "path";

import jsonFileContainer from "../../../../src/page/labelling/content/files/json/jsonFileContainer";

const displayControl = () => {
  document.querySelector("#open-directory-page").style.display = "none";
  document.querySelector("#open-file-page").style.display = "none";
  document.querySelector("#form-criteria-page").style.display = "none";
  document.querySelector("#labelling-page").style.display = "";
}

const showList = () => {
  displayControl();

  const resources = fs.readFileSync(path.join(__dirname, "../test/helpers/resources.json"));
  const jsonMockPath = JSON.parse(resources).json;
  const videoSample1ResultJSONPath = path.join(__dirname, jsonMockPath.video_sample1_result);

  const contents = JSON.parse(fs.readFileSync(videoSample1ResultJSONPath));
  const videos = contents.videos;
  
  jsonFileContainer.showVideoFiles(videos);
}

export default {
  showList
}