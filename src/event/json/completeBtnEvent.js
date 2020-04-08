import { remote } from "electron";

import jsonControl from "../../helpers/json_control";

import labellingData from "../../model/labellingData";
import videoData from "../../model/videoData";

const COMPLETE_BTN = document.getElementById("complete");

COMPLETE_BTN.addEventListener("click", (event) => {
  const GLOBAL = remote.getGlobal("sharedObject");

  const JSON_PATH = GLOBAL.JSON_FILE.PATH;
  const CRITERIAS = GLOBAL.CRITERIA;
  const VIDEO_TITLE = GLOBAL.VIDEO_DATA.TITLE;
  const VIDEO_FRAME_LENGTH = GLOBAL.FRAME.LENGTH;

  const json = jsonControl.getJSONFile(JSON_PATH);

  // 1. Video file info
  if(hasOverlappingVideo(VIDEO_TITLE, json.videos)) {
    alert(`There is overlapping video data. \n\n '${VIDEO_TITLE}'`);
    return;
  }

  // 2. Criteria info
  const overlappingCriterias = checkOverlappingCriterias(CRITERIAS, json.criteria);
  if(overlappingCriterias.length > 0) {
    let overlappingCriteriasStr = "";

    overlappingCriterias.forEach((criteria) => {
      overlappingCriteriasStr = overlappingCriteriasStr.concat("\'", criteria, "\'", "\n");
    });

    alert(`There is overlapping criterias. \n\n ${overlappingCriteriasStr}`);
    return;
  } else {
    json.setCriteria(CRITERIAS);
  }

  // 3. labeling info
  const labellingInfos = getTableData();

  const checkLabellingData = checkLabellingDatas(labellingInfos);
  if(checkLabellingData > 0) {
    alert(`Invalid data exists. \n\n There is a problem with table number '${checkLabellingData}'.`);
    return;
  }

  // set data
  const VideoData = new videoData();
  const labellingList = VideoData.convertLabellingDataToFrameList(VIDEO_FRAME_LENGTH, labellingInfos);

  VideoData.setTitle(VIDEO_TITLE)
    .setCreateAt()
    .setFrameList(labellingList);

  json.setVideos(VideoData);

  // write json
  // jsonControl.isWriteJSONFile(JSON_PATH,  json, VideoData);

  console.log(json);
})

const hasOverlappingVideo = (videoTitle, jsonVideos) => {
  return Array.prototype.some.call(jsonVideos, (jsonVideo) => {
    if(jsonVideo.title == videoTitle) {
      return true;
    }
  });
}

const checkOverlappingCriterias = (criterias, jsonCriterias) => {
  let result = [];

  Array.prototype.forEach.call(jsonCriterias, (jsonCriteria) => {
    Array.prototype.forEach.call(criterias, (criteria) => {
      if(jsonCriteria.text == criteria.text) {
        result.push(criteria.text);
      }
    })
  });

  return result;
}

const checkLabellingDatas = (labellingInfos) => {
  let result = 0;
  let beforeEnd = 0;

  Array.prototype.some.call(labellingInfos, (labellingInfo, index) => {
    const start = labellingInfo.start;
    const end =labellingInfo.end;

    if(start > end) {
      result = (index + 1);
      return true;
    }

    if(beforeEnd > start) {
      result = (index + 1);
      return true;
    }

    beforeEnd = end;
  })

  return result;
}

const getTableData = () => {
  const table = document.getElementById("result-list");
  const rowLength = table.rows.length;

  let result = [];

  for (let i = 1; i < rowLength; i++) {
    const row = table.rows.item(i);
    const cells = row.cells;
    const cellLength = cells.length;

    const LabellingData = new labellingData();

    /**
     * 1.type / 2.start / 3.end
     */
    for (let i = 1; i < cellLength; i++) {
      const cell = cells[i];
      const value = cell.innerHTML;

      switch (i) {
        case 1:
          LabellingData.type = value;
          break;
        case 2:
          LabellingData.start = Number.parseInt(value);
          break;
        case 3:
          LabellingData.end = Number.parseInt(value);
          break;
      }
    }

    result.push(LabellingData);
  };

  return result;
}
