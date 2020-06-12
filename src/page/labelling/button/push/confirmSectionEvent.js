import resultContainer from "../../list/result/resultContainer";
import criteriaContainer from "../../list/criteria/criteriaContainer";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  event.target.blur();

  const startFrameIndex = Number.parseInt(document.getElementById("start-frame-input").innerText);
  const endFrameIndex = Number.parseInt(document.getElementById("end-frame-input").innerText);
  const criteriaTagList = criteriaContainer.selectedCriteria();

  if (startFrameIndex > endFrameIndex) {
    alert(`START: ${startFrameIndex} > END: ${endFrameIndex}`);
    return false;
  }

  if (criteriaTagList.length <= 0) {
    alert("기준을 선택하세요.");
    return false;
  }

  const criteriaType = criteriaContainer.getCriteriaTypes(criteriaTagList);

  if (resultContainer.hasSameData(startFrameIndex, endFrameIndex, criteriaType)) {
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

  resultContainer.showLabellingData(startFrameIndex, endFrameIndex, criteriaType);
  document.getElementById("start-frame-input").innerText = endFrameIndex;
  document.getElementById("start-frame-input").focus();
  document.getElementById("end-frame-input").setAttribute("autofocus", "");

  return true;
});