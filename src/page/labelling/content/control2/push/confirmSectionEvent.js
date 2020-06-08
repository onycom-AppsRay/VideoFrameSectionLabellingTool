import labellingContainer from "../complete/labellingContainer";

import criteriaContainer from "../criteria/criteriaContainer";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  event.target.blur();

  const startFrameInput = Number.parseInt(document.getElementById("start-frame-input").innerText);
  const endFrameInput = Number.parseInt(document.getElementById("end-frame-input").innerText);
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

  const criteriaType = criteriaContainer.getCriteriaTypes(criteriaTag);

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
  startFrameInput.innerText = endFrameIndex;
  startFrameInput.focus();
  endFrameInput.setAttribute("autofocus", "");

  return true;
});