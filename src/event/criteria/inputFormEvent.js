import globalCriteria from "../../model/global/globalCriteria";

import inputModalContainer from "../../section/criteria/inputModalContainer";

const CRITERIA_INSERT_BTN = document.getElementById("criteria-insert");

CRITERIA_INSERT_BTN.onclick = () => {
  const text = document.getElementById("input-criteria").value;
  document.getElementById("input-criteria").value = "";
  document.getElementById("input-criteria").focus();

  if (!validate(text)) {
    return;
  }

  const GlobalCriteria = new globalCriteria();
  const globalCriteriaArr = GlobalCriteria.getCriteria();
  const globalCriteriaArrLength = globalCriteriaArr.length;
  const type = (globalCriteriaArrLength + 1);

  let temp = [{
    "type": type,
    "text": text
  }];

  inputModalContainer.showCriteria(type, text);

  GlobalCriteria.setCriteria(temp);
  // TODO(yhpark): Managing Global criteria
  console.log("Global Criteria: ", new globalCriteria().getCriteria());
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
