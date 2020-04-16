import labellingContainer from "../complete/labellingContainer";

import criteriaContainer from "./criteriaContainer";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  event.target.blur();

  const startFrameInput = document.getElementById("start-frame-input");
  const endFrameInput =document.getElementById("end-frame-input");

  const startFrameIndex = startFrameInput.innerText;
  const endFrameIndex = endFrameInput.innerText;

  const criteriaTag = criteriaContainer.selectedCriteria();

  if (criteriaContainer.validate(startFrameIndex, endFrameIndex, criteriaTag)) {
    const criteriaType = criteriaTag.dataset.type;

    if (labellingContainer.hasSameData(startFrameIndex, endFrameIndex, criteriaType)) {
      alert("Same data.");
      return;
    } else {
      const message =
        `Confirm with \n` +
        `Criteria: ${criteriaType} / ` +
        `Start: ${startFrameIndex} / ` +
        `End: ${endFrameIndex} \n`;

      if (!confirm(message)) return;

      labellingContainer.showLabellingData(startFrameIndex, endFrameIndex, criteriaType);

      startFrameInput.innerText = endFrameIndex;
      startFrameInput.focus();
      endFrameInput.setAttribute("autofocus", "");
    }
  }
});
