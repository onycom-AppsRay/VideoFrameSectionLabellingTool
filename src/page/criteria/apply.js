import JSONFile2DTO from "../../model/dto/JSONFile";

import tagControl from "../../helpers/tag_control";
import jsonControl from "../../helpers/json/json_control";

import criteriaContainer from "../labelling/list/criteria/criteriaContainer";

const goLabellingPageBtn = document.getElementById("go-labelling-page-btn");

goLabellingPageBtn.onclick = () => {
  const CriteriaTableTag = document.querySelectorAll(`li[name="inserted-criteria"]`);

  if (CriteriaTableTag.length <= 0) {
    alert("기준을 입력하세요.");

    return false;
  }

  const criteriaList = getCriteriaList(CriteriaTableTag);

  Array.prototype.forEach.call(criteriaList, (criteria) => {
    criteriaContainer.setCheckbox(criteria.type, criteria.text);
  })

  const JSONFile2 = new JSONFile2DTO()
    .setCriterias(criteriaList);

  jsonControl.writeJSONFile(JSONFile2.getDirPath(), JSONFile2);

  // Change page.
  document.getElementById("form-criteria-page").style.display = "none";
  document.querySelector(".js-content").style.display = "";

  // initialize
  tagControl.initialize(document.getElementById("criteria-modal-header"));
  document.getElementById("input-criteria2").value = "";

  return;
}

const getCriteriaList = (CriteriaTableTag) => {
  let result = [];

  Array.prototype.forEach.call(CriteriaTableTag, (CriteriaTableRow) => {
    const type = CriteriaTableRow.childNodes[0].innerText;
    const text = CriteriaTableRow.childNodes[1].innerText;

    result.push({
      "type": type,
      "text": text
    });
  })

  return result;
}