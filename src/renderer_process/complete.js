import Labelling from '../model/laballing';
import globalValiable from "../model/global_valiable";
import videoData from "../model/videoData";

const completeContainer = document.getElementById("complete-container");

/**
 * 최종적으로 JSON 파일에 라벨링 데이터 작성하고, 다음 Video 파일로 이동.
 * 1. JSON 파일에 라벨링 데이터 작성
 *  1) Input 'type', 'start', 'end' (LabellingData)
 * 2. 다음 Video 파일로 이동
 */
completeContainer.addEventListener("click", (event) => {
  console.log("complete container");

  // List data insert
  const labellingData = getTableData();

  // Validate

  // file write

  // data setting
  const VideoData = new videoData("sample.mp4", new Date(), new Array(100).fill(0));
  VideoData.setFrameList(labellingData);

  console.log(VideoData.getFrameList());
  // file create

  // Next video
});

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
