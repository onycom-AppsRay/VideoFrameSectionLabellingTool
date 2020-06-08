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

const setCheckbox = (type, text) => {
  const checkboxContainer = document.createElement("div");
  checkboxContainer.style.padding = "5%";

  const input = document.createElement("input");
  input.className = "form-check-input";
  input.type = "checkbox";
  input.id = `criteria-${type}`;
  input.name = "criteria";
  input.dataset.type = `${type}`;
  input.dataset.criteria = `${text}`;

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.htmlFor = `criteria-${type}`;
  label.innerText = text;
  label.style.display = "block";
  label.style.whiteSpace = "nowrap";
  label.style.textDecoration = "underline";
  label.style.textAlign = "center";

  checkboxContainer.insertAdjacentHTML('beforeend', input.outerHTML);
  checkboxContainer.insertAdjacentHTML('beforeend', label.outerHTML);

  document.getElementById("criteria-list").appendChild(checkboxContainer);
}

export default {
  selectedCriteria,
  validate,
  setCheckbox
}