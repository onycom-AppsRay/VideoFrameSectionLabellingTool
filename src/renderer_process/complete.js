import Labelling from '../model/laballing';
import GlobalValiable from "../model/global_valiable";
import videoData from "../model/videoData";

const completeContainer = document.getElementById("complete-container");

completeContainer.addEventListener("click", (event) => {
  console.log("complete container");

  // List data insert
  const labellingData = getTableData();

  // Validate

  // file write
  const Global = new GlobalValiable();
  const gFrame = Global.FRAME;
  const gFrameLength = gFrame.LENGTH;

  const gJSONFile = Global.JSON_FILE;
  const globalJSONName = gJSONFile.NAME;

  console.log("gFrame: ", gFrame);
  console.log("gJSONFile: ", gJSONFile);

  const VideoData = new videoData(globalJSONName, new Date(), new Array(100).fill(0));

  labellingData.forEach((value) => {
    const type = value.type;
    const start = value.start;
    const end = value.end;

    switch(type) {
      case "A":
        VideoData.setFrameList(0, start, end);
        break;
      case "B":
        VideoData.setFrameList(1, start, end);
        break;
      case "c":
        VideoData.setFrameList(2, start, end);
        break;
    };
  });

  console.log(VideoData.getFrameList());
  // file create

  // Next video
});

const setLabellingData = (labellingDataList) => {

}

const getTableData = () => {
  const table = document.getElementById("result-list");
  const rowLength = table.rows.length;

  let result = [];

  for (let i = 1; i < rowLength; i++) {
    const row = table.rows.item(i);
    const cells = row.cells;
    const cellLength = cells.length;

    const LabellingData = new Labelling();

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
