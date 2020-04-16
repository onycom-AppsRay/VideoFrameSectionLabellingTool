
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

export default {
  selectedCriteria,
  validate
}
