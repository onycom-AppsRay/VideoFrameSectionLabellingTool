import labellingContainer from "../complete/labellingContainer";

import criteriaContainer from "../criteria/criteriaContainer";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  event.target.blur();

  const startFrameIndex = Number.parseInt(document.getElementById("start-frame-input").innerText);
  const endFrameIndex = Number.parseInt(document.getElementById("end-frame-input").innerText);
  const criteriaTagList = criteriaContainer.selectedCriteria();

  if (startFrameIndex == "" || endFrameIndex == "") {
    alert("프레임을 선택하세요.");
    return false;
  }

  if (startFrameIndex > endFrameIndex) {
    alert(`START: ${startFrameIndex} > END: ${endFrameIndex}`);
    return false;
  }

  if (criteriaTagList.length <= 0) {
    alert("기준을 선택하세요.");
    return false;
  }

  const criteriaType = criteriaContainer.getCriteriaTypes(criteriaTagList);

  if (labellingContainer.hasSameData(startFrameIndex, endFrameIndex, criteriaType)) {
    alert("Same data.");
    return false;
  }

  const message =
    `Confirm with \n` +
    `Criteria: ${criteriaType} / ` +
    `Start: ${startFrameIndex} / ` +
    `End: ${endFrameIndex} \n`;

  if (!confirm(message)) {
    return false;
  }

  labellingContainer.showLabellingData(startFrameIndex, endFrameIndex, criteriaType);
  document.getElementById("start-frame-input").innerText = endFrameIndex;
  document.getElementById("start-frame-input").focus();
  document.getElementById("end-frame-input").setAttribute("autofocus", "");

  return true;
});