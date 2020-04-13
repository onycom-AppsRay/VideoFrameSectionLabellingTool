import criteriaContainer from "../../section/criteria/criteriaContainer";
import labellingContainer from "../../section/label/labellingContainer";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  const startFrameIndex = document.getElementById("start-frame-input").innerHTML;
  const endFrameIndex = document.getElementById("end-frame-input").innerHTML;
  const criteriaTag = criteriaContainer.selectedCriteria();

  if (validate(startFrameIndex, endFrameIndex, criteriaTag)) {
    const criteriaLabel = criteriaTag.dataset.label;

    if (labellingContainer.hasSameData(startFrameIndex, endFrameIndex, criteriaLabel)) {
      alert("Same data.");
      return;
    } else {
      const message =
        `Confirm with \n` +
        `Criteria: ${criteriaLabel} / ` +
        `Start: ${startFrameIndex} / ` +
        `End: ${endFrameIndex} \n`;

      if (!confirm(message)) return;q

      labellingContainer.showLabellingData(startFrameIndex, endFrameIndex, criteriaLabel);
    }
  }
})

const validate = (startFrameIndex, endFrameIndex, criteria) => {
  if (startFrameIndex == '' || endFrameIndex == '') {
    alert('Please select a frame.');
    return false;
  }

  if (Number.parseInt(startFrameIndex) > Number.parseInt(endFrameIndex)) {
    alert(`START: ${startFrameIndex} > END: ${endFrameIndex}`);
    return false;
  }

  if (!criteria) {
    alert(`Please select a criteria.`);
    return false;
  }

  return true;
}
