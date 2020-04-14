import tagControl from "../../../../../helpers/tag_control";

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

export default {
  initialize,
  showLabellingData,
  resetTableBodyIndex,
  hasSameData
}
