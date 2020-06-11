
import tagControl from "../../../../helpers/tag_control";
import jsonControl from "../../../../helpers/json/json_control";

import labellingDataDTO from "../../../../model/dto/labellingData";

const initialize = () => {
  const criteriaTempList = document.querySelector("#result-list tbody");
  tagControl.initialize(criteriaTempList);
}

const showLabellingData = (startFrameIndex, endFrameIndex, criteria) => {
  const tbody = document.querySelector("#result-list tbody");
  const length = tbody.rows.length;

  const row = document.createElement("tr");
  row.className = "labelling-data-row";
  row.innerHTML = [
    `<th scope="row">${length}</th>`,
    `<td>${criteria}</td>`,
    `<td>${startFrameIndex}</td>`,
    `<td>${endFrameIndex}</td>`,
  ].join('');

  tbody.appendChild(row);
}

const resetTableBodyIndex = () => {
  const tbody = document.querySelector("#result-list tbody");
  const length = tbody.rows.length;

  for (let i = 0; i < length; i++) {
    tbody.rows.item(i).cells[0].innerHTML = i;
  }
}

const hasSameData = (startFrameIndex, endFrameIndex, criteria) => {
  const tbody = document.querySelector("#result-list tbody");
  const length = tbody.rows.length;

  for (let i = 0; i < length; i++) {
    const type = tbody.rows.item(i).cells[1].innerHTML;
    const start = Number.parseInt(tbody.rows.item(i).cells[2].innerHTML);
    const end = Number.parseInt(tbody.rows.item(i).cells[3].innerHTML);

    if ((Number.parseInt(startFrameIndex) == start) &&
      (Number.parseInt(endFrameIndex) == end) &&
      criteria == type) {
        return true;
      }
  }

  return false;
}

const getLabellingData = () => {
  const table = document.getElementById("result-list");
  const rowLength = table.rows.length;

  let result = [];

  for (let i = 1; i < rowLength; i++) {
    const row = table.rows.item(i);
    const cells = row.cells;
    const cellLength = cells.length;

    const LabellingData = new labellingDataDTO();

    for (let i = 1; i < cellLength; i++) {
      const cell = cells[i];
      const value = cell.innerHTML;

      switch (i) {
        case 1:
          LabellingData.setType(value);
          break;
        case 2:
          LabellingData.setStart(value);
          break;
        case 3:
          LabellingData.setEnd(value);
          break;
      }
    }

    result.push(LabellingData);
  };

  return result;
}

const showLabellingDataInJSON = (jsonPath, fileName) => {
  const completedLabellingData = jsonControl.getLabellingDataInJSON(jsonPath, fileName);
  
  let before = 0;
  let start, end = 0;
  let flag = false;

  completedLabellingData.forEach((value, index) => {
    if (value > 0 && before != value) {
      if (flag) {
        end = (index - 1);
        flag = false;

        showLabellingData(start, end, String.fromCharCode(before + 64));
      }

      start = index;
      flag = true;
      before = value;

      return;
    }

    if (flag && before != value) {
      end = (index - 1);
      flag = false;

      showLabellingData(start, end, String.fromCharCode(before + 64));
    }

    before = value;
  })
}

export default {
  initialize,
  showLabellingData,
  resetTableBodyIndex,
  hasSameData,
  getLabellingData,
  showLabellingDataInJSON
}
