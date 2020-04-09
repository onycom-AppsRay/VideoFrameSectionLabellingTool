import inputModalContainer from "../../section/criteria/inputModalContainer";

const CRITERIA_INSERT_BTN = document.getElementById("criteria-insert");

CRITERIA_INSERT_BTN.onclick = () => {
  const text = document.getElementById("input-criteria").value;
  document.getElementById("input-criteria").value = "";
  document.getElementById("input-criteria").focus();

  if (!validate(text)) {
    return;
  }

  const criteriaIndex = Number.parseInt(inputModalContainer.getCriteriaIndex()) + 1;

  inputModalContainer.showCriteria(criteriaIndex, text);
}

const hasSameCriteria = (criteria) => {
  const criteriaTempTextList = document.querySelectorAll(".criteria-temp-text");

  const result = Array.prototype.some.call(criteriaTempTextList, (criteriaText) => {
    if (criteriaText.innerText == criteria) {
      return true;
    }
  });

  return result;
}

const validate = (criteria) => {
  if (!criteria) {
    alert(`There is no data entered.`);
    return false;
  }

  if (hasSameCriteria(criteria)) {
    alert(`There are overlapping criteria.`);
    return false;
  }

  return true;
}
