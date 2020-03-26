import globalVideoData from "../model/globalVideoData";
import globalJSONFile from "../model/globalJSONFile";
import labellingData from "../model/laballingData";
import videoData from "../model/videoData";

import jsonControl from "../helpers/json_control";

import openFile from "../renderer_process/open_file";
import openDirectory from "../renderer_process/open_directory";

const completeContainer = document.getElementById("complete-container");

completeContainer.addEventListener("click", (event) => {
  const GlobalJSONFile = new globalJSONFile();

  const jsonFilePath = GlobalJSONFile.PATH;
  const jsonFileName = GlobalJSONFile.NAME;

  if(jsonFilePath == "" || jsonFileName == "") {
    alert("Select or create a JSON file before saving.");
  } else {
    console.log("get json and save");

    const LabellingData = getTableData();

    const GlobalVideoData = new globalVideoData();

    const videoTitle = GlobalVideoData.TITLE;
    GlobalVideoData.setLabellingDataToFrameList(LabellingData);
    const frameList = GlobalVideoData.FRAME_LIST;

    const JSONFile = jsonControl.getJSONFile(jsonFilePath);

    const VideoData = new videoData(videoTitle, new Date(), frameList);

    if(jsonControl.writeJSONFile(jsonFilePath, JSONFile, VideoData)) {
      openFile.addFileTitleTag(videoTitle);
      openFile.showJSONFileVideoDataCount(openFile.getJSONFileVideoDataCount() + 1);

      openDirectory.markingVideoTitle(videoTitle);
      openDirectory.showCompletedVideoCount(openDirectory.getCompletedVideoCount() + 1);
    }
  }
});

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
