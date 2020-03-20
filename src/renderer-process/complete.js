import Labelling from '../model/laballing';

const completeContainer = document.getElementById("complete-container");

completeContainer.addEventListener("click", (event) => {
  console.log("complete container");

  // List data insert
  const labellingData = setResultListData();

  console.log(labellingData[0]);
  console.log(labellingData[1]);
  console.log(labellingData[2]);

  // Validate

  // file write & file create

  // Next video
});

const setResultListData = () => {
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
          LabellingData.start = value;
          break;
        case 3:
          LabellingData.end = value;
          break;
      }
    }

    result.push(LabellingData);
  };

  return result;
}
