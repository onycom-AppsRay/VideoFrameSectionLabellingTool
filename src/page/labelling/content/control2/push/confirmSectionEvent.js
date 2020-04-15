import labellingContainer from "../complete/labellingContainer";

const SECTION_CONFIRM = document.getElementById("section-confirm");

SECTION_CONFIRM.addEventListener("click", (event) => {
  const startFrameIndex = document.getElementById("start-frame-input").innerHTML;
  const endFrameIndex = document.getElementById("end-frame-input").innerHTML;
  const criteriaTag = selectedCriteria();

  if (validate(startFrameIndex, endFrameIndex, criteriaTag)) {
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
    }
  }
});

const selectedCriteria = () => {
  const criteriaList = document.querySelectorAll("#criteria-list input[name=criteria]");

  let result = "";
  Array.prototype.some.call(criteriaList, (criteria) => {
    if(criteria.checked == true) {
      result = criteria;
      return true;
    }
  })

  return result;
};

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
};
