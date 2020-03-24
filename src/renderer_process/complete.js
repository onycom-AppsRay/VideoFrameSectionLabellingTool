import globalVideoData from "../model/globalVideoData";
import globalJSONFile from "../model/globalJSONFile";
import labellingData from "../model/laballingData";

const completeContainer = document.getElementById("complete-container");

completeContainer.addEventListener("click", (event) => {
  const LabellingData = getTableData();

  const GlobalVideoData = new globalVideoData();
  GlobalVideoData.setLabellingDataToFrameList(LabellingData);


  const GlobalJSONFile = new globalJSONFile();

  if(GlobalJSONFile.PATH == "" || GlobalJSONFile.NAME == "") {
    // json file 이 없으면 잠시 보류 했다가, write
    alert("Select or create a JSON file before saving.");
  } else {
    // json file 이 있으면 write
    console.log("get json and save");
  }

  console.log(GlobalJSONFile);
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
