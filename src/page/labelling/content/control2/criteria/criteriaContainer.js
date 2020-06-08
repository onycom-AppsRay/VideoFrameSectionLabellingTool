const selectedCriteria = () => {
  const criteriaList = document.querySelectorAll("#criteria-list input[name=criteria]");

  let result = [];

  Array.prototype.forEach.call(criteriaList, (criteria) => {
    if(criteria.checked == true) {
      result.push(criteria);
    }
  })

  return result;
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
  label.innerText = String.prototype.concat(type, ". ", text);
  label.style.display = "block";
  label.style.whiteSpace = "nowrap";
  label.style.textDecoration = "underline";
  label.style.textAlign = "center";

  checkboxContainer.insertAdjacentHTML('beforeend', input.outerHTML);
  checkboxContainer.insertAdjacentHTML('beforeend', label.outerHTML);

  document.getElementById("criteria-list").appendChild(checkboxContainer);
}

const getCriteriaTypes = (criteriaTagList = []) => {
  const length = criteriaTagList.length;

  let result = "";

  for(let i = 0; i < length; i++) {
    const type = criteriaTagList[i].dataset.type;

    if (i == 0) {
      result = type;
    } else {
      result = String.prototype.concat(result, ", ", type);
    } 
  }

  return result;
}


export default {
  selectedCriteria,
  setCheckbox,
  getCriteriaTypes
}